import { supabase } from './supabase';

export async function savePlaybackProgress(
  episode_id: string,
  position: number,
  duration: number
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('playback_progress')
    .upsert({
      user_id: user.id,
      episode_id,
      position,
      duration,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id,episode_id'
    });

  return { error };
}

export async function getPlaybackProgress(episode_id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: 'Not authenticated' };

  const { data, error } = await supabase
    .from('playback_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('episode_id', episode_id)
    .maybeSingle();

  return { data, error };
}

export async function deletePlaybackProgress(episode_id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('playback_progress')
    .delete()
    .eq('user_id', user.id)
    .eq('episode_id', episode_id);

  return { error };
}

export async function getContinueWatching(limit = 10) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: 'Not authenticated' };

  const { data, error } = await supabase
    .from('playback_progress')
    .select(`
      *,
      watch_history!inner(
        anime_id,
        anime_title,
        episode_number,
        thumbnail
      )
    `)
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
    .limit(limit);

  return { data, error };
}
