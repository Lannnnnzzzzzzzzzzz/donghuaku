import { supabase } from './supabase';

export async function getSkipTimes(anime_id: string) {
  const { data, error } = await supabase
    .from('skip_times')
    .select('*')
    .eq('anime_id', anime_id)
    .maybeSingle();

  return { data, error };
}

export async function saveSkipTimes(
  anime_id: string,
  times: {
    intro_start?: number;
    intro_end?: number;
    outro_start?: number;
    outro_end?: number;
  }
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('skip_times')
    .upsert({
      anime_id,
      created_by: user.id,
      ...times,
    }, {
      onConflict: 'anime_id'
    });

  return { error };
}
