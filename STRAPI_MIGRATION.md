# Strapi Migration Documentation

## Overview
This document outlines the migration from Supabase to Strapi for the work items data integration in the React project.

## Files Modified

### 1. New API Integration (`src/api/strapi.ts`)
- Created new Strapi API client with authentication
- Defined updated WorkItem interface based on Strapi structure
- Implemented methods for fetching work items with and without related items
- Added helper functions for data transformation

### 2. Updated Components

#### `src/pages/Test.tsx`
- **Changes Made:**
  - Replaced Supabase import with Strapi API
  - Updated fetch logic to use `strapiAPI.getWorkItems()` (without related items)
  - Modified video filtering to use `muxPlaybackId` instead of `type === 'mux'`
  - Updated error messages to reference Strapi

#### `src/pages/Mobile.tsx`
- **Changes Made:**
  - Updated WorkItem import to use Strapi interface
  - No API calls in this component (receives data as props)

#### `src/pages/WorkDetails.tsx`
- **Changes Made:**
  - Replaced Supabase import with Strapi API
  - Updated fetch logic to use `strapiAPI.getWorkItemBySlug()` (with related items)
  - Removed `getMuxPlaybackId` function (no longer needed)
  - Updated related items filtering to use `muxPlaybackId` instead of `type === 'video'`
  - Replaced `capability` field with `overview` using `richTextToPlainText` helper
  - Removed image handling (not part of new Strapi structure)

#### `src/pages/Home.tsx`
- **Changes Made:**
  - Replaced Supabase import with Strapi API
  - Updated fetch logic to use `strapiAPI.getWorkItems()`

### 3. Updated Interface (`src/api/supabase.ts`)
- Updated WorkItem interface to match Strapi API structure
- Maintained backward compatibility for existing components

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Strapi Configuration
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your_strapi_api_token_here
```

## API Endpoints Used

### For Test.tsx and Mobile.tsx (no related items):
```
GET /api/workitems
```

### For WorkDetails.tsx (with related items):
```
GET /api/workitems?filters[slug][$eq]={slug}&populate=relatedItems
```

## Data Structure Changes

### Old Supabase Structure:
```typescript
interface WorkItem {
    id: number;
    cols: number;
    rows: number;
    type: string;
    muxPlaybackId?: string;
    title: string;
    slug: string;
    description: string;
    relatedItems: Array<{ type: string; muxPlaybackId?: string; }>;
    overview?: string;
    capability?: string;
    team?: string;
}
```

### New Strapi Structure:
```typescript
interface WorkItem {
    id: number;
    documentId: string;
    cols: number;
    rows: number;
    muxPlaybackId: string;
    title: string;
    slug: string;
    description: string;
    overview?: Array<RichTextBlock>;
    clientImpact?: Array<RichTextBlock>;
    team?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    relatedItems?: WorkItem[];
}
```

## Key Differences

1. **Related Items**: Now self-referencing WorkItem objects instead of generic objects with type field
2. **Rich Text**: `overview` and `clientImpact` are now rich text arrays instead of HTML strings
3. **Video Detection**: Use `muxPlaybackId` presence instead of `type === 'mux'`
4. **No Image Items**: Removed separate image handling as it's not part of the new structure
5. **Document ID**: Added `documentId` field from Strapi
6. **Timestamps**: Added proper timestamp fields

## Authentication

The Strapi API client automatically includes the Bearer token in all requests:

```typescript
headers: {
    'Authorization': `Bearer ${this.apiToken}`,
    'Content-Type': 'application/json'
}
```

## Error Handling

- All API calls include proper error handling
- Loading states are maintained
- User-friendly error messages are displayed

## Next Steps

1. Set up your Strapi backend with the workitems content type
2. Configure the API token with appropriate permissions
3. Update the environment variables with your Strapi URL and API token
4. Test all components to ensure proper data loading and display

## Testing Checklist

- [ ] Test.tsx loads work items correctly
- [ ] Mobile.tsx receives and displays work items
- [ ] WorkDetails.tsx loads individual work items with related items
- [ ] Home.tsx loads work items for mobile/desktop switching
- [ ] Error handling works properly
- [ ] Loading states display correctly
- [ ] Related items display in WorkDetails
