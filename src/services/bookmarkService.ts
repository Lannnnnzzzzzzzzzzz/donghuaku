import { supabase, getUserId } from '../lib/supabase';

export interface Bookmark {
  id: string;
  user_id: string;
  anime_id: string;
  anime_title: string;
  thumbnail?: string;
  status: string;
  created_at: string;
}

export async function addBookmark(data: {
  animeId: string;
  animeTitle: string;
  thumbnail?: string;
  status?: string;
}) {
  const userId = getUserId();

  const { data: existing, error: fetchError } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .eq('anime_id', data.animeId)
    .maybeSingle();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching bookmark:', fetchError);
    return null;
  }

  if (existing) {
    return existing;
  }

  const { data: inserted, error: insertError } = await supabase
    .from('bookmarks')
    .insert({
      user_id: userId,
      anime_id: data.animeId,
      anime_title: data.animeTitle,
      thumbnail: data.thumbnail || '',
      status: data.status || 'watching',
    })
    .select()
    .single();

  if (insertError) {
    console.error('Error adding bookmark:', insertError);
    return null;
  }

  return inserted;
}

export async function removeBookmark(animeId: string) {
  const userId = getUserId();

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', userId)
    .eq('anime_id', animeId);

  if (error) {
    console.error('Error removing bookmark:', error);
    return false;
  }

  return true;
}

export async function getBookmarks(): Promise<Bookmark[]> {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching bookmarks:', error);
    return [];
  }

  return data || [];
}

export async function isBookmarked(animeId: string): Promise<boolean> {
  const userId = getUserId();

  const { data, error } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', userId)
    .eq('anime_id', animeId)
    .maybeSingle();

  if (error) {
    console.error('Error checking bookmark:', error);
    return false;
  }

  return !!data;
}
