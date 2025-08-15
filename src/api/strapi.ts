// Strapi API configuration and types
const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

// WorkItem interface based on Strapi API definition
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

export interface StrapiResponse<T> {
    data: T;
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface StrapiSingleResponse<T> {
    data: T;
    meta: {};
}

// API client class for Strapi
class StrapiAPI {
    private baseURL: string;
    private apiToken: string;

    constructor() {
        this.baseURL = STRAPI_BASE_URL;
        this.apiToken = STRAPI_API_TOKEN || '';
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.baseURL}/api${endpoint}`;
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiToken}`,
            ...options.headers,
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Strapi API request failed:', error);
            throw error;
        }
    }

    // Fetch all work items without related items (for Test.tsx and Mobile.tsx)
    async getWorkItems(): Promise<WorkItem[]> {
        try {
            const response = await this.request<StrapiResponse<WorkItem[]>>('/work-items');
            return response.data;
        } catch (error) {
            console.error('Error fetching work items:', error);
            throw error;
        }
    }

    // Fetch single work item by slug with related items (for WorkDetails.tsx)
    async getWorkItemBySlug(slug: string): Promise<WorkItem | null> {
        try {
            const response = await this.request<StrapiResponse<WorkItem[]>>(
                `/work-items?filters[slug][$eq]=${slug}&populate=relatedItems`
            );
            
            if (response.data && response.data.length > 0) {
                return response.data[0];
            }
            
            return null;
        } catch (error) {
            console.error('Error fetching work item by slug:', error);
            throw error;
        }
    }

    // Fetch single work item by ID with related items
    async getWorkItemById(id: number): Promise<WorkItem | null> {
        try {
            const response = await this.request<StrapiSingleResponse<WorkItem>>(
                `/work-items/${id}?populate=relatedItems`
            );
            
            return response.data;
        } catch (error) {
            console.error('Error fetching work item by ID:', error);
            throw error;
        }
    }
}

// Export singleton instance
export const strapiAPI = new StrapiAPI();

// Helper function to convert rich text to plain text
export const richTextToPlainText = (richText?: Array<{
    type: string;
    children: Array<{
        type: string;
        text: string;
    }>;
}>): string => {
    if (!richText || !Array.isArray(richText)) return '';
    
    return richText
        .map(block => 
            block.children
                ?.map(child => child.text || '')
                .join('')
        )
        .join('\n')
        .trim();
};

// Helper function to check if work item has video
export const hasVideo = (item: WorkItem): boolean => {
    return Boolean(item.muxPlaybackId);
};

// Helper function to determine video type based on cols/rows
export const getVideoType = (item: WorkItem): 'portrait' | 'landscape' | 'square' => {
    if (item.cols === 1 && item.rows === 3) return 'portrait';
    if ((item.cols === 2 && item.rows === 2) || (item.cols === 2 && item.rows === 3)) return 'landscape';
    return 'square';
};
