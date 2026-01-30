import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface CourseProgress {
  courseId: string;
  messageCount: number;
  conversationCount: number;
  lastActivity: string;
}

export interface DashboardStats {
  totalMessages: number;
  totalConversations: number;
  coursesEngaged: number;
  courseProgress: CourseProgress[];
}

export function useDashboardStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const loadStats = useCallback(async () => {
    if (!user) {
      setStats(null);
      setLoading(false);
      return;
    }

    try {
      // Get all user's conversations
      const { data: conversations, error: convError } = await supabase
        .from('conversations')
        .select('id, course_id, updated_at')
        .eq('user_id', user.id);

      if (convError) throw convError;

      if (!conversations || conversations.length === 0) {
        setStats({
          totalMessages: 0,
          totalConversations: 0,
          coursesEngaged: 0,
          courseProgress: [],
        });
        setLoading(false);
        return;
      }

      // Get message counts for each conversation
      const conversationIds = conversations.map(c => c.id);
      const { data: messages, error: msgError } = await supabase
        .from('messages')
        .select('conversation_id')
        .in('conversation_id', conversationIds);

      if (msgError) throw msgError;

      // Calculate stats per course
      const courseMap = new Map<string, { messageCount: number; conversationCount: number; lastActivity: string }>();

      conversations.forEach(conv => {
        const existing = courseMap.get(conv.course_id) || {
          messageCount: 0,
          conversationCount: 0,
          lastActivity: conv.updated_at,
        };
        existing.conversationCount++;
        if (new Date(conv.updated_at) > new Date(existing.lastActivity)) {
          existing.lastActivity = conv.updated_at;
        }
        courseMap.set(conv.course_id, existing);
      });

      // Count messages per course
      messages?.forEach(msg => {
        const conv = conversations.find(c => c.id === msg.conversation_id);
        if (conv) {
          const existing = courseMap.get(conv.course_id);
          if (existing) {
            existing.messageCount++;
          }
        }
      });

      const courseProgress: CourseProgress[] = Array.from(courseMap.entries()).map(([courseId, data]) => ({
        courseId,
        ...data,
      }));

      // Sort by most recent activity
      courseProgress.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());

      setStats({
        totalMessages: messages?.length || 0,
        totalConversations: conversations.length,
        coursesEngaged: courseMap.size,
        courseProgress,
      });
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return { stats, loading, refreshStats: loadStats };
}
