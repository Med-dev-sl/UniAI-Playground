import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Bot, User, Sparkles, RefreshCw, History, Star, Copy, FileText, Volume2, DownloadCloud } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';
import { getCourseById, getFacultyById } from '@/data/courses';
import { useToast } from '@/hooks/use-toast';
import { useChatHistory, ChatMessage } from '@/hooks/useChatHistory';
import { useFavorites } from '@/hooks/useFavorites';
import { ConversationHistory } from './ConversationHistory';
import { CourseSwitchDropdown } from './CourseSwitchDropdown';
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
  onChangeCourse?: () => void;
  onSwitchCourse?: (courseId: string) => void;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/course-chat`;

export function ChatInterface({ courseId, onBack, onChangeCourse, onSwitchCourse }: ChatInterfaceProps) {
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
  const isCourseFavorite = isFavorite(courseId);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
    // Remove all markdown bold markers (**) and heading hashes (##, ###, etc.)
    const sanitized = content.replace(/\*\*/g, '').replace(/#+\s*/g, '').trim();
    return sanitized;
  };

  // Clipboard
  const copyToClipboard = async (text: string) => {
    try {
      const cleaned = text.replace(/\*\*/g, '').replace(/#+\s*/g, '');
      await navigator.clipboard.writeText(cleaned);
      toast({ title: 'Copied', description: 'AI response copied to clipboard.' });
    } catch (e) {
      toast({ title: 'Copy failed', description: 'Unable to copy to clipboard.', variant: 'destructive' });
    }
  };

  // Download as Word (.doc) using HTML blob which Word can open
  const downloadAsWord = (text: string, filename = 'uniai-response') => {
    const cleaned = text.replace(/\*\*/g, '').replace(/#+\s*/g, '');
    const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>${cleaned
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>')}</body></html>`;
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.doc`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // Printable PDF via print dialog (user can choose Save as PDF)
  const downloadAsPdf = (text: string, filename = 'uniai-response') => {
    const cleaned = text.replace(/\*\*/g, '').replace(/#+\s*/g, '');
    const w = window.open('', '_blank');
    if (!w) {
      toast({ title: 'Popup blocked', description: 'Unable to open print window.', variant: 'destructive' });
      return;
    }
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${filename}</title><style>body{font-family:Inter, Arial, sans-serif;padding:24px;color:#111} pre{white-space:pre-wrap;font-family:inherit}</style></head><body><pre>${cleaned.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre></body></html>`;
    w.document.write(html);
    w.document.close();
    w.focus();
    // Give the new window a moment to render before calling print
    setTimeout(() => w.print(), 300);
  };

  // Text to Speech (female voice preferred)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      toast({ title: 'Not supported', description: 'Speech synthesis is not supported in this browser.' });
      return;
    }
    window.speechSynthesis.cancel();
    const cleaned = text.replace(/\*\*/g, '').replace(/#+\s*/g, '');
    const u = new SpeechSynthesisUtterance(cleaned);
    // choose a female voice if available
    const voices = window.speechSynthesis.getVoices();
    let voice = voices.find(v => /female/i.test(v.name)) || voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (voice) u.voice = voice;
    u.rate = 1; // not too fast or slow
    u.pitch = 1;
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    utteranceRef.current = null;
  };

  if (historyLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric" />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 h-[calc(100dvh-6rem)] sm:h-[calc(100dvh-8rem)]">
      {/* Conversation History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex-shrink-0 overflow-hidden"
          >
            <ConversationHistory
              conversations={conversations}
              currentConversationId={conversation?.id}
              onSelect={handleSelectConversation}
              onNew={handleNewChat}
              onDelete={deleteConversation}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 mb-4 flex-shrink-0"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <AnimatedButton variant="ghost" size="sm" onClick={onBack}>
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
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                    <span className="truncate">Online • {faculty?.shortName}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {onSwitchCourse && (
                <CourseSwitchDropdown
                  currentCourseId={courseId}
                  onSwitchCourse={onSwitchCourse}
                />
              )}
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
        <div className="flex-1 overflow-y-auto space-y-4 mb-2 sm:mb-4 pr-1 sm:pr-2 custom-scrollbar min-h-0" style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}>
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-electric' 
                    : 'bg-gradient-to-br from-electric/20 to-electric-glow/20 border border-electric/30'
                }`}>
                  {message.role === 'user' 
                    ? <User className="w-4 h-4 text-primary-foreground" />
                    : <Sparkles className="w-4 h-4 text-electric" />
                  }
                </div>
                
                <div className={`max-w-[85%] sm:max-w-[70%] md:max-w-[60%] ${
                  message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                }`}>
                  <div className="whitespace-pre-wrap text-sm">
                    {renderContent(message.content)}
                  </div>

                  {/* Assistant controls: copy, download, pdf, tts */}
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                        aria-label="Copy response"
                      >
                        <Copy className="w-4 h-4" /> Copy
                      </button>

                      <button
                        onClick={() => downloadAsWord(message.content, `uniai-response-${message.id}`)}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                        aria-label="Download as Word"
                      >
                        <FileText className="w-4 h-4" /> Word
                      </button>

                      <button
                        onClick={() => downloadAsPdf(message.content, `uniai-response-${message.id}`)}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                        aria-label="Download as PDF"
                      >
                        <DownloadCloud className="w-4 h-4" /> PDF
                      </button>

                      <button
                        onClick={() => speak(message.content)}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                        aria-label="Play response"
                      >
                        <Volume2 className="w-4 h-4" /> Listen
                      </button>

                      <button
                        onClick={stopSpeaking}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                        aria-label="Stop speech"
                      >
                        Stop
                      </button>
                    </div>
                  )}

                  <div className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
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
          className="glass-card p-3 sm:p-4 flex-shrink-0"
        >
          <div className="flex gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about ${course?.shortName}...`}
                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-electric/50 focus:border-electric/50 resize-none min-h-[52px] max-h-32"
                rows={1}
              />
            </div>
            <AnimatedButton
              type="submit"
              disabled={!input.trim() || isTyping}
              className="self-end"
            >
              <Send className="w-5 h-5" />
            </AnimatedButton>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </motion.form>
      </div>
    </div>
  );
}
