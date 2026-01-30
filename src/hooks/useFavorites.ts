import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface FavoriteCourse {
  id: string;
  course_id: string;
  created_at: string;
}

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteCourse[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('favorite_courses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to load favorites:', error);
    } else {
      setFavorites(data || []);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const addFavorite = useCallback(async (courseId: string) => {
    if (!user) return false;

    const { error } = await supabase
      .from('favorite_courses')
      .insert({
        user_id: user.id,
        course_id: courseId,
      });

    if (error) {
      if (error.code === '23505') {
        // Already a favorite, ignore duplicate
        return true;
      }
      console.error('Failed to add favorite:', error);
      return false;
    }

    await loadFavorites();
    return true;
  }, [user, loadFavorites]);

  const removeFavorite = useCallback(async (courseId: string) => {
    if (!user) return false;

    const { error } = await supabase
      .from('favorite_courses')
      .delete()
      .eq('user_id', user.id)
      .eq('course_id', courseId);

    if (error) {
      console.error('Failed to remove favorite:', error);
      return false;
    }

    await loadFavorites();
    return true;
  }, [user, loadFavorites]);

  const isFavorite = useCallback((courseId: string) => {
    return favorites.some(f => f.course_id === courseId);
  }, [favorites]);

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    loadFavorites,
  };
}
