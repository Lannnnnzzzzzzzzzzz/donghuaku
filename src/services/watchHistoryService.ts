import { supabase, getUserId } from '../lib/supabase';

export interface WatchHistoryItem {
  id: string;
  user_id: string;
  anime_id: string;
  episode_id: string;
  anime_title: string;
  episode_number: string;
  thumbnail?: string;
  watched_at: string;
  last_position: number;
  duration: number;
  completed: boolean;
}

export async function addToWatchHistory(data: {
  animeId: string;
  episodeId: string;
  animeTitle: string;
  episodeNumber: string;
  thumbnail?: string;
  lastPosition?: number;
  duration?: number;
  completed?: boolean;
}) {
  const userId = getUserId();

  const { data: existingHistory, error: fetchError } = await supabase
    .from('watch_history')
    .select('*')
    .eq('user_id', userId)
    .eq('episode_id', data.episodeId)
    .maybeSingle();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching watch history:', fetchError);
    return null;
  }

  if (existingHistory) {
    const { data: updated, error: updateError } = await supabase
      .from('watch_history')
      .update({
        watched_at: new Date().toISOString(),
        last_position: data.lastPosition || existingHistory.last_position,
        duration: data.duration || existingHistory.duration,
        completed: data.completed !== undefined ? data.completed : existingHistory.completed,
      })
      .eq('id', existingHistory.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating watch history:', updateError);
      return null;
    }

    return updated;
  }

  const { data: inserted, error: insertError } = await supabase
    .from('watch_history')
    .insert({
      user_id: userId,
      anime_id: data.animeId,
      episode_id: data.episodeId,
      anime_title: data.animeTitle,
      episode_number: data.episodeNumber,
      thumbnail: data.thumbnail || '',
      last_position: data.lastPosition || 0,
      duration: data.duration || 0,
      completed: data.completed || false,
    })
    .select()
    .single();

  if (insertError) {
    console.error('Error adding to watch history:', insertError);
    return null;
  }

  return inserted;
}

export async function getWatchHistory(limit: number = 20): Promise<WatchHistoryItem[]> {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('watch_history')
    .select('*')
    .eq('user_id', userId)
    .order('watched_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching watch history:', error);
    return [];
  }

  return data || [];
}

export async function getContinueWatching(): Promise<WatchHistoryItem[]> {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('watch_history')
    .select('*')
    .eq('user_id', userId)
    .eq('completed', false)
    .gt('last_position', 0)
    .order('watched_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching continue watching:', error);
    return [];
  }

  return data || [];
}

export async function clearWatchHistory() {
  const userId = getUserId();

  const { error } = await supabase
    .from('watch_history')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error clearing watch history:', error);
    return false;
  }

  return true;
}
