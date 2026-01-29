import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Conversation {
  id: string;
  course_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export function useChatHistory(courseId: string) {
  const { user } = useAuth();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Load all conversations for this course
  const loadConversations = useCallback(async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .order('updated_at', { ascending: false });
    
    if (data) {
      setConversations(data);
    }
  }, [user, courseId]);

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: string) => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    
    if (data) {
      setMessages(data.map(m => ({
        ...m,
        role: m.role as 'user' | 'assistant'
      })));
    }
  }, []);

  // Initialize - load most recent conversation or create new
  useEffect(() => {
    async function init() {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      await loadConversations();

      // Try to get most recent conversation for this course
      const { data: existingConvo } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingConvo) {
        setConversation(existingConvo);
        await loadMessages(existingConvo.id);
      }

      setLoading(false);
    }

    init();
  }, [user, courseId, loadConversations, loadMessages]);

  // Create a new conversation
  const createConversation = useCallback(async (title?: string) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: user.id,
        course_id: courseId,
        title: title || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create conversation:', error);
      return null;
    }

    setConversation(data);
    setMessages([]);
    await loadConversations();
    return data;
  }, [user, courseId, loadConversations]);

  // Save a message
  const saveMessage = useCallback(async (
    conversationId: string,
    role: 'user' | 'assistant',
    content: string
  ) => {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        role,
        content,
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to save message:', error);
      return null;
    }

    // Update conversation's updated_at
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return data;
  }, []);

  // Switch to a different conversation
  const switchConversation = useCallback(async (conversationId: string) => {
    const convo = conversations.find(c => c.id === conversationId);
    if (convo) {
      setConversation(convo);
      await loadMessages(conversationId);
    }
  }, [conversations, loadMessages]);

  // Delete a conversation
  const deleteConversation = useCallback(async (conversationId: string) => {
    await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId);

    if (conversation?.id === conversationId) {
      setConversation(null);
      setMessages([]);
    }
    
    await loadConversations();
  }, [conversation, loadConversations]);

  return {
    conversation,
    messages,
    conversations,
    loading,
    createConversation,
    saveMessage,
    switchConversation,
    deleteConversation,
    loadConversations,
  };
}
