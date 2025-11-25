import { supabase } from '../lib/supabase';

export interface SkipTimes {
  id: string;
  anime_id: string;
  intro_start: number;
  intro_end: number;
  outro_start: number;
  outro_end: number;
  created_at: string;
}

export async function getSkipTimes(animeId: string): Promise<SkipTimes | null> {
  const { data, error } = await supabase
    .from('skip_times')
    .select('*')
    .eq('anime_id', animeId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching skip times:', error);
    return null;
  }

  return data;
}
