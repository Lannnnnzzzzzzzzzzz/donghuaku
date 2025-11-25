import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables', {
    url: supabaseUrl ? 'present' : 'missing',
    key: supabaseAnonKey ? 'present' : 'missing'
  });
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export function getUserId(): string {
  let userId = localStorage.getItem('sankadong_user_id');

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem('sankadong_user_id', userId);
  }

  return userId;
}

export interface WatchHistory {
  id: string;
  user_id: string;
  episode_id: string;
  anime_id: string;
  anime_title: string;
  episode_number: string;
  thumbnail?: string;
  last_position?: number;
  duration?: number;
  completed?: boolean;
  watched_at: string;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  anime_id: string;
  anime_title: string;
  thumbnail?: string;
  status: 'watching' | 'completed' | 'plan_to_watch' | 'dropped';
  created_at: string;
}
