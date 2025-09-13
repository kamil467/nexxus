# Works Table Migration Documentation

## Overview
This document outlines the migration from the old work_items table to the new Works table structure in Supabase.

## Database Changes

### Old Structure (work_items):
- `id` (number)
- `cols` (number) - Used for determining video type
- `rows` (number) - Used for determining video type  
- `muxPlaybackId` (string) - Video playback ID
- `title` (string)
- `slug` (string)
- `description` (string)
- `overview` (string)
- `capability` (string)
- `team` (string)
- `relatedItems` (array)

### New Structure (Works):
- `id` (number)
- `created_at` (timestamp)
- `type` ('portrait' | 'landscape') - Pre-computed video type
- `videoID` (string) - Video playback ID
- `title` (string)
- `slug` (string)
- `description` (string)
- `overview` (string)
- `client_impact` (string) - Replaces capability
- `related_items` (array) - Will be implemented later

## Field Mappings

| Old Field | New Field | Notes |
|-----------|-----------|-------|
| `id` | `id` | No change |
| `cols` + `rows` | `type` | Logic moved to pre-computed field |
| `muxPlaybackId` | `videoID` | Renamed field |
| `title` | `title` | No change |
| `slug` | `slug` | No change |
| `description` | `description` | No change |
| `overview` | `overview` | No change |
| `capability` | `client_impact` | Renamed field |
| `team` | *(removed)* | Not in new structure |
| `relatedItems` | `related_items` | Will be implemented later |
| *(new)* | `created_at` | New timestamp field |

## Code Changes

### 1. Updated WorkItem Interface (`src/api/supabase.ts`)
```typescript
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
```

### 2. Updated API Calls
All components now fetch from the `Works` table (note: case-sensitive) instead of `work_items`:
- `Test.tsx`: Updated fetch call and video filtering logic
- `Home.tsx`: Updated fetch call (provides data to Mobile.tsx)
- `WorkDetails.tsx`: Updated fetch call and field references

**Important**: The table name is `Works` (capital W), not `works` (lowercase).

### 3. Updated Video Type Logic
**Before (using cols/rows):**
```typescript
const isPortrait = item.cols === 1 && item.rows === 3;
const isLandscape = (item.cols === 2 && item.rows === 2) || (item.cols === 2 && item.rows === 3);
```

**After (using pre-computed type):**
```typescript
const isPortrait = item.type === 'portrait';
const isLandscape = item.type === 'landscape';
```

### 4. Updated Video Playback References
**Before:**
```typescript
<MuxPlayer playbackId={item.muxPlaybackId} />
```

**After:**
```typescript
<MuxPlayer playbackId={item.videoID} />
```

### 5. Updated Field References
**Before:**
```typescript
currentProject?.capability
```

**After:**
```typescript
currentProject?.client_impact
```

## Files Modified

### Core Files:
- `src/api/supabase.ts` - Updated WorkItem interface
- `src/pages/Test.tsx` - Updated fetch and filtering logic
- `src/pages/Mobile.tsx` - Updated video type detection and playback
- `src/pages/Home.tsx` - Updated fetch call
- `src/pages/WorkDetails.tsx` - Updated fetch and field references

### Key Changes by Component:

#### Test.tsx:
- Changed table name from `work_items` to `Works`
- Updated video filtering to use `item.videoID && item.type === 'landscape'`
- Updated MuxPlayer to use `item.videoID`
- Simplified mobile items logic to use pre-computed `item.type`

#### Mobile.tsx:
- Updated video type detection to use `item.type === 'portrait'`
- Updated MuxPlayer and thumbnail URLs to use `item.videoID`

#### WorkDetails.tsx:
- Changed table name from `work_items` to `Works`
- Updated field reference from `capability` to `client_impact`
- Removed `team` field reference
- Commented out related items section (to be implemented later)

#### Home.tsx:
- Changed table name from `work_items` to `Works`

## Benefits of New Structure

1. **Simplified Logic**: No need to calculate video type from cols/rows
2. **Better Performance**: Pre-computed video types reduce client-side calculations
3. **Clearer Field Names**: `videoID` and `client_impact` are more descriptive
4. **Consistent Naming**: Following standard database naming conventions
5. **Future-Ready**: Structure prepared for related_items implementation

## Testing Checklist

- [ ] Test.tsx loads and displays videos correctly
- [ ] Mobile.tsx shows proper video types (portrait/landscape)
- [ ] WorkDetails.tsx loads individual projects
- [ ] Home.tsx switches between mobile/desktop views
- [ ] Video playback works with new videoID field
- [ ] Client impact information displays correctly
- [ ] No console errors related to missing fields

## Next Steps

1. Implement `related_items` functionality in WorkDetails.tsx
2. Test with actual Works table data
3. Verify all video types are correctly classified
4. Update any remaining references to old field names
