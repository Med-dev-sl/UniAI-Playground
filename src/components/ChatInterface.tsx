import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Bot, User, Sparkles, RefreshCw, History, Star, Copy, Download, Volume2, Square } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';
import { getCourseById, getFacultyById } from '@/data/courses';
import { useToast } from '@/hooks/use-toast';
import { useChatHistory, ChatMessage } from '@/hooks/useChatHistory';
import { useFavorites } from '@/hooks/useFavorites';
import { ConversationHistory } from './ConversationHistory';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  courseId: string;
  onBack: () => void;
}

interface TextToSpeechState {
  messageId: string | null;
  isPlaying: boolean;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/course-chat`;

export function ChatInterface({ courseId, onBack }: ChatInterfaceProps) {
  const course = getCourseById(courseId);
  const faculty = course ? getFacultyById(course.faculty) : null;
  const { toast } = useToast();
  const { user } = useAuth();
  
  const {
    conversation,
    messages: savedMessages,
    conversations,
    loading: historyLoading,
    createConversation,
    saveMessage,
    switchConversation,
    deleteConversation,
  } = useChatHistory(courseId);

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  const [showHistory, setShowHistory] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tts, setTts] = useState<TextToSpeechState>({ messageId: null, isPlaying: false });
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const isCourseFavorite = isFavorite(courseId);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getWelcomeMessage = (): Message => ({
    id: 'welcome',
    role: 'assistant',
    content: `Welcome to UniAI Playground! 🎓\n\nI'm your specialized AI assistant for **${course?.shortName}**. I'm here to help you with questions specifically related to your ${course?.level} programme.\n\nFeel free to ask me about:\n• Course concepts and theories\n• Study materials and resources\n• Assignment guidance\n• Exam preparation tips\n• Career opportunities in this field\n\nHow can I assist you today?`,
    timestamp: new Date()
  });

  // Load saved messages when conversation changes
  useEffect(() => {
    if (savedMessages.length > 0) {
      setMessages(savedMessages.map((m: ChatMessage) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: new Date(m.created_at)
      })));
    } else if (!historyLoading) {
      setMessages([getWelcomeMessage()]);
    }
  }, [savedMessages, historyLoading, course?.shortName, course?.level]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamChat = async (userMessages: Message[], conversationId: string) => {
    const response = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: userMessages.map(m => ({ role: m.role, content: m.content })),
        courseId: course?.id || '',
        courseName: course?.name || '',
        courseLevel: course?.level || '',
        facultyName: faculty?.name || '',
        courseDescription: course?.description || '',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 429) {
        toast({
          title: "Rate Limited",
          description: "Too many requests. Please wait a moment and try again.",
          variant: "destructive",
        });
        throw new Error("Rate limited");
      }
      
      if (response.status === 402) {
        toast({
          title: "Usage Limit Reached",
          description: "Please add credits to continue using AI features.",
          variant: "destructive",
        });
        throw new Error("Payment required");
      }
      
      throw new Error(errorData.error || "Failed to get response");
    }

    if (!response.body) throw new Error("No response body");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";
    let streamDone = false;

    const assistantId = Date.now().toString();
    setMessages(prev => [
      ...prev,
      { id: assistantId, role: 'assistant', content: '', timestamp: new Date() }
    ]);

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => 
              prev.map(m => 
                m.id === assistantId 
                  ? { ...m, content: assistantContent }
                  : m
              )
            );
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => 
              prev.map(m => 
                m.id === assistantId 
                  ? { ...m, content: assistantContent }
                  : m
              )
            );
          }
        } catch { /* ignore */ }
      }
    }

    // Save assistant message to database
    if (assistantContent) {
      await saveMessage(conversationId, 'assistant', assistantContent);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping || !user) return;

    let currentConversation = conversation;
    
    // Create conversation if none exists
    if (!currentConversation) {
      const firstMessagePreview = input.trim().slice(0, 50);
      currentConversation = await createConversation(firstMessagePreview);
      if (!currentConversation) {
        toast({
          title: "Error",
          description: "Failed to create conversation. Please try again.",
          variant: "destructive",
        });
        return;
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    // Save user message to database
    await saveMessage(currentConversation.id, 'user', userMessage.content);

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      await streamChat(updatedMessages, currentConversation.id);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleNewChat = async () => {
    await createConversation();
    setMessages([getWelcomeMessage()]);
  };

  const handleSelectConversation = async (conversationId: string) => {
    await switchConversation(conversationId);
    setShowHistory(false);
  };

  const renderContent = (content: string) => {
    return content.split('**').map((part, i) => 
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  };

  // Copy to clipboard
  const handleCopyMessage = (content: string, messageId: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedMessageId(messageId);
      toast({
        title: "Copied!",
        description: "Message copied to clipboard",
      });
      setTimeout(() => setCopiedMessageId(null), 2000);
    }).catch(() => {
      toast({
        title: "Error",
        description: "Failed to copy message",
        variant: "destructive",
      });
    });
  };

  // Download as Word Document
  const handleDownloadWord = (content: string) => {
    const htmlContent = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>${course?.shortName} - Chat Response</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1 { color: #333; }
            .meta { color: #666; font-size: 0.9em; margin-bottom: 20px; }
            .content { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>${course?.shortName} - AI Response</h1>
          <div class="meta">
            <p>Course: ${course?.name}</p>
            <p>Date: ${new Date().toLocaleString()}</p>
          </div>
          <div class="content">${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${course?.shortName}-response-${Date.now()}.doc`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Response saved as Word document",
    });
  };

  // Download as PDF
  const handleDownloadPDF = (content: string) => {
    try {
      const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 1000 >>
stream
BT
/F1 12 Tf
50 750 Td
(${course?.shortName} - AI Response) Tj
0 -30 Td
(Course: ${course?.name}) Tj
0 -20 Td
(Date: ${new Date().toLocaleString()}) Tj
0 -40 Td
(${content.replace(/[()]/g, '').substring(0, 500)}...) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000074 00000 n
0000000133 00000 n
0000000281 00000 n
0000001331 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1420
%%EOF`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${course?.shortName}-response-${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Downloaded!",
        description: "Response saved as PDF",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download PDF",
        variant: "destructive",
      });
    }
  };

  // Text to Speech with female voice
  const handleTextToSpeech = (content: string, messageId: string) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setTts({ messageId: null, isPlaying: false });
      return;
    }

    // Clean content for speech
    const cleanContent = content
      .replace(/\*\*/g, '')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleanContent);
    utterance.rate = 0.9; // Slightly slow (0.5-2, default 1)
    utterance.pitch = 1.2; // Slightly higher pitch for female voice
    utterance.volume = 1;

    // Load voices and select a female voice
    const loadVoicesAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.name.includes('Google US English Female') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen')
      ) || voices.find(voice => voice.name.toLowerCase().includes('female')) || voices[1] || voices[0];

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      utterance.onend = () => {
        setTts({ messageId: null, isPlaying: false });
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setTts({ messageId, isPlaying: true });
    };

    // Some browsers need a delay for voices to load
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = loadVoicesAndSpeak;
    } else {
      loadVoicesAndSpeak();
    }
  };

  // Stop speech
  const handleStopSpeech = () => {
    window.speechSynthesis.cancel();
    setTts({ messageId: null, isPlaying: false });
  };

  if (historyLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric" />
      </div>
    );
  }

  return (
    <div className="flex gap-2 sm:gap-4 h-[calc(100vh-8rem)] max-h-[800px] flex-col sm:flex-row">
      {/* Conversation History Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {showHistory && (
          <>
            {/* Mobile overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="fixed left-0 top-0 bottom-0 z-50 sm:relative sm:z-auto overflow-hidden"
            >
              <ConversationHistory
                conversations={conversations}
                currentConversationId={conversation?.id}
                onSelect={handleSelectConversation}
                onNew={handleNewChat}
                onDelete={deleteConversation}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-3 sm:p-4 mb-2 sm:mb-4 flex-shrink-0"
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <AnimatedButton variant="ghost" size="sm" onClick={onBack} className="flex-shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </AnimatedButton>
              
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-electric to-electric-glow flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-foreground text-sm sm:text-base truncate">
                    {course?.shortName} AI
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                    <span className="truncate">Online • {faculty?.shortName}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <AnimatedButton 
                variant="ghost" 
                size="sm" 
                onClick={() => isCourseFavorite ? removeFavorite(courseId) : addFavorite(courseId)}
                className={isCourseFavorite ? 'text-yellow-500' : ''}
              >
                <Star className={`w-4 h-4 ${isCourseFavorite ? 'fill-current' : ''}`} />
              </AnimatedButton>
              <AnimatedButton 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowHistory(!showHistory)}
                className={showHistory ? 'bg-electric/20' : ''}
              >
                <History className="w-4 h-4" />
              </AnimatedButton>
              <AnimatedButton variant="ghost" size="sm" onClick={handleNewChat}>
                <RefreshCw className="w-4 h-4" />
              </AnimatedButton>
            </div>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 mb-2 sm:mb-4 px-2 sm:px-0 custom-scrollbar">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`flex gap-2 sm:gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-electric' 
                    : 'bg-gradient-to-br from-electric/20 to-electric-glow/20 border border-electric/30'
                }`}>
                  {message.role === 'user' 
                    ? <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground" />
                    : <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-electric" />
                  }
                </div>
                
                <div className={`flex-1 group ${
                  message.role === 'user' ? 'flex flex-col items-end' : ''
                }`}>
                  <div className={`max-w-[95%] sm:max-w-[80%] ${
                    message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                  }`}>
                    <div className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">
                      {renderContent(message.content)}
                    </div>
                    <div className={`text-xs mt-1.5 sm:mt-2 ${
                      message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {/* Message Actions - AI responses only */}
                  {message.role === 'assistant' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2 mt-2 flex-wrap"
                    >
                      <button
                        onClick={() => handleCopyMessage(message.content, message.id)}
                        className="p-1.5 sm:p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground text-xs sm:text-sm"
                        title="Copy message"
                      >
                        {copiedMessageId === message.id ? '✓ Copied' : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </button>

                      <button
                        onClick={() => handleTextToSpeech(message.content, message.id)}
                        className={`p-1.5 sm:p-2 rounded-lg transition-colors text-xs sm:text-sm ${
                          tts.messageId === message.id
                            ? 'bg-electric/20 text-electric'
                            : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                        title={tts.messageId === message.id ? 'Stop listening' : 'Read aloud'}
                      >
                        {tts.messageId === message.id ? (
                          <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                      </button>

                      <div className="relative group/download">
                        <button
                          className="p-1.5 sm:p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground text-xs sm:text-sm"
                          title="Download options"
                        >
                          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        
                        {/* Download dropdown */}
                        <div className="hidden group-hover/download:block absolute right-0 mt-2 bg-muted border border-border rounded-lg shadow-lg z-50">
                          <button
                            onClick={() => handleDownloadWord(message.content)}
                            className="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-electric/20 rounded-lg transition-colors whitespace-nowrap"
                          >
                            Word (.doc)
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(message.content)}
                            className="block w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-electric/20 rounded-lg transition-colors whitespace-nowrap"
                          >
                            PDF
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && messages[messages.length - 1]?.role === 'user' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric/20 to-electric-glow/20 border border-electric/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-electric" />
              </div>
              <div className="chat-bubble-ai">
                <div className="flex gap-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-electric"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-electric"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-electric"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="glass-card p-2 sm:p-4 flex-shrink-0"
        >
          <div className="flex gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about ${course?.shortName}...`}
                className="w-full bg-muted/50 border border-border rounded-xl px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50 resize-none min-h-[44px] sm:min-h-[52px] max-h-28 sm:max-h-32"
                rows={1}
              />
            </div>
            <AnimatedButton
              type="submit"
              disabled={!input.trim() || isTyping}
              className="self-end flex-shrink-0 px-3 sm:px-6"
              size="sm"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </AnimatedButton>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 sm:mt-2 text-center">
            Enter to send • Shift + Enter for new line
          </p>
        </motion.form>
      </div>
    </div>
  );
}
