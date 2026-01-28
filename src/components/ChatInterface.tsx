import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ArrowLeft, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { AnimatedButton } from './ui/AnimatedButton';
import { Course, getFacultyById, getCourseById } from '@/data/courses';

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

export function ChatInterface({ courseId, onBack }: ChatInterfaceProps) {
  const course = getCourseById(courseId);
  const faculty = course ? getFacultyById(course.faculty) : null;
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Welcome to UniAI Playground! 🎓\n\nI'm your specialized AI assistant for **${course?.shortName}**. I'm here to help you with questions specifically related to your ${course?.level} programme.\n\nFeel free to ask me about:\n• Course concepts and theories\n• Study materials and resources\n• Assignment guidance\n• Exam preparation tips\n• Career opportunities in this field\n\nHow can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response (in production, this would call your AI backend)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(input, course),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string, course?: Course): string => {
    // This is a placeholder - in production, integrate with your AI backend
    const responses = [
      `Great question about ${course?.shortName}! This topic is fundamental to understanding the core concepts of your programme. Let me explain...`,
      `In the context of ${course?.shortName}, this is an important area to master. Here's what you need to know...`,
      `As a ${course?.level} student in ${course?.shortName}, understanding this will help you excel. Here's my explanation...`,
      `This is a key concept in your field of study. Based on the ${course?.shortName} curriculum, here's what I can share...`,
    ];
    return responses[Math.floor(Math.random() * responses.length)] + 
      `\n\n*Note: I'm a demo AI assistant. For full functionality, please connect me to a backend AI service.*`;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: `Chat cleared! 🔄\n\nI'm ready to help you with any questions about **${course?.shortName}**. What would you like to learn today?`,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[800px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AnimatedButton variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </AnimatedButton>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-electric-glow flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">
                  {course?.shortName} AI
                </h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Online • {faculty?.shortName}
                </p>
              </div>
            </div>
          </div>

          <AnimatedButton variant="ghost" size="sm" onClick={clearChat}>
            <RefreshCw className="w-4 h-4" />
          </AnimatedButton>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
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
              
              <div className={`max-w-[80%] ${
                message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
              }`}>
                <div className="whitespace-pre-wrap text-sm">
                  {message.content.split('**').map((part, i) => 
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                  )}
                </div>
                <div className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
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
        className="glass-card p-4"
      >
        <div className="flex gap-3">
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
  );
}