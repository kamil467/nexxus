import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Updated WorkItem interface based on Strapi API definition
export interface WorkItem {
    id: number;
    documentId: string;
    cols: number;
    rows: number;
    muxPlaybackId: string;
    title: string;
    slug: string;
    description: string;
    overview?: Array<{
        type: string;
        children: Array<{
            type: string;
            text: string;
        }>;
    }>;
    clientImpact?: Array<{
        type: string;
        children: Array<{
            type: string;
            text: string;
        }>;
    }>;
    team?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    relatedItems?: WorkItem[];
}