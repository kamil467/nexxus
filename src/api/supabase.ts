import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WorkItem {
  id: number;
  title: string;
  description: string;
  type: 'image' | 'vimeo' | 'youtube';
  image?: string;
  videoId?: string;
  hId?: string;
  cols: number;
  rows: number;
  slug: string;
  relatedItems?: RelatedItem[];
  // Additional fields for WorkDetails
  overview?: string;
  capability?: string;
  team?: string;
}

export interface RelatedItem {
  id?: number;
  type: 'image' | 'video';
  src?: string;
  videoId?: string;
  title?: string;
  description?: string;
}