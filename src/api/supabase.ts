import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WorkItem {
    id: number;
    created_at: string;
    type: 'portrait' | 'landscape';
    videoID: string;
    title: string;
    slug: string;
    description: string;
    overview?: string;
    client_impact?: string;
    related_items?: any[]; // Will be updated later
}