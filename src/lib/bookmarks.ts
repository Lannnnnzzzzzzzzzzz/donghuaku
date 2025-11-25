import { supabase } from './supabase';
import type { Bookmark } from './supabase';

export async function addBookmark(data: {
  anime_id: string;
  anime_title: string;
  thumbnail?: string;
  status?: 'watching' | 'completed' | 'plan_to_watch' | 'dropped';
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase.from('bookmarks').insert({
    user_id: user.id,
    ...data,
  });

  return { error };
}

export async function removeBookmark(anime_id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', user.id)
    .eq('anime_id', anime_id);

  return { error };
}

export async function updateBookmarkStatus(
  anime_id: string,
  status: 'watching' | 'completed' | 'plan_to_watch' | 'dropped'
) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { error } = await supabase
    .from('bookmarks')
    .update({ status })
    .eq('user_id', user.id)
    .eq('anime_id', anime_id);

  return { error };
}

export async function getBookmarks(status?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: null, error: 'Not authenticated' };

  let query = supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  return { data, error };
}

export async function isBookmarked(anime_id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: false, error: null };

  const { data, error } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('anime_id', anime_id)
    .maybeSingle();

  return { data: !!data, error };
}
