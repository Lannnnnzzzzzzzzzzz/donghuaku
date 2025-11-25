import { supabase, getUserId } from '../lib/supabase';

export interface PlaybackProgress {
  id: string;
  user_id: string;
  episode_id: string;
  position: number;
  duration: number;
  updated_at: string;
}

export async function savePlaybackProgress(episodeId: string, position: number, duration: number) {
  const userId = getUserId();

  const { data: existing, error: fetchError } = await supabase
    .from('playback_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('episode_id', episodeId)
    .maybeSingle();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching playback progress:', fetchError);
    return null;
  }

  if (existing) {
    const { data: updated, error: updateError } = await supabase
      .from('playback_progress')
      .update({
        position,
        duration,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating playback progress:', updateError);
      return null;
    }

    return updated;
  }

  const { data: inserted, error: insertError } = await supabase
    .from('playback_progress')
    .insert({
      user_id: userId,
      episode_id: episodeId,
      position,
      duration,
    })
    .select()
    .single();

  if (insertError) {
    console.error('Error saving playback progress:', insertError);
    return null;
  }

  return inserted;
}

export async function getPlaybackProgress(episodeId: string): Promise<PlaybackProgress | null> {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('playback_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('episode_id', episodeId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching playback progress:', error);
    return null;
  }

  return data;
}
