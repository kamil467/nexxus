import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WorkItem {
    id: number;
    cols: number;
    rows: number;
    type: string;
    image?: string;
    muxPlaybackId?: string;
    videoId?: string;
    hId?: string;
    title: string;
    slug: string;
    description: string;
    relatedItems: Array<{ type: string; src?: string; muxPlaybackId?: string; videoId?: string; hId?: string }>;
    overview?: string;
    capability?: string;
    team?: string;
}