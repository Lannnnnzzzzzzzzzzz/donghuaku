import { supabase } from './supabase';
import type { WatchHistory } from './supabase';

export async function addToWatchHistory(data: {
  episode_id: string;
  anime_id: string;
  anime_title: string;
  episode_number: string;
  thumbnail?: string;
  last_position?: number;
  duration?: number;
  completed?: boolean;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { data: existing } = await supabase
    .from('watch_history')
    .select('*')
    .eq('user_id', user.id)
    .eq('episode_id', data.episode_id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from('watch_history')
      .update({
        watched_at: new Date().toISOString(),
        last_position: data.last_position || existing.last_position,
        duration: data.duration || existing.duration,
        completed: data.completed ?? existing.completed,
      })
      .eq('id', existing.id);

    return { error };
  }

  const { error } = await supabase.from('watch_history').insert({
    user_id: user.id,
    ...data,
  });

  return { error };
}

export async function getWatchHistory(limit = 50) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: 'Not authenticated' };

  const { data, error } = await supabase
    .from('watch_history')
    .select('*')
    .eq('user_id', user.id)
    .order('watched_at', { ascending: false })
    .limit(limit);

  return { data, error };
}

export async function getAnimeWatchHistory(anime_id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: 'Not authenticated' };

  const { data, error } = await supabase
    .from('watch_history')
    .select('*')
    .eq('user_id', user.id)
    .eq('anime_id', anime_id)
    .order('watched_at', { ascending: false });

  return { data, error };
}

export async function deleteWatchHistory(id: string) {
  const { error } = await supabase
    .from('watch_history')
    .delete()
    .eq('id', id);

  return { error };
}

export async function clearWatchHistory() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('watch_history')
    .delete()
    .eq('user_id', user.id);

  return { error };
}
