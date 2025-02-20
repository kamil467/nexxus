interface WorkItem {
    id: number;
    cols: number;
    rows: number;
    type: string;
    image?: string;
    videoId?: string;
    hId?: string;
    title: string;
    slug: string;
    description: string;
    relatedItems: Array<{ type: string; src?: string; videoId?: string; hId?: string }>;
    overview?: string;
    capability?: string;
    team?: string;
}

const workItems: WorkItem[] = [
    {
        id: 1,
        cols: 1,
        rows: 1,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1734784548166-a1ffe07dd7cd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODJ8fHxlbnwwfHx8fHw%3D',
        title: 'Urban Architecture',
        slug: 'urban-architecture',
        description: 'Modern architectural design showcasing the beauty of urban landscapes.',
        overview: 'A comprehensive exploration of urban architectural elements that define modern cityscapes. This project focuses on the intersection of functionality and aesthetic appeal in contemporary urban design.',
        capability: 'Architectural Design, 3D Modeling, Urban Planning, Sustainable Development',
        team: 'Lead Architect: John Smith\nProject Manager: Sarah Johnson\nDesign Team: Michael Chen, Emma Davis',
        relatedItems: [
            { type: 'image', src: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=60' },
            { type: 'video', videoId: '1058323026', hId: 'b97a3cc228' },
            { type: 'video', videoId: '1058621851', hId: '3caccb6ab6' }
        ]
    },
    {
        id: 2,
        cols: 2,
        rows: 2,
        type: 'image',
        image: 'https://plus.unsplash.com/premium_photo-1739091068170-5486fbb36cff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjV8fHxlbnwwfHx8fHw%3D',
        title: "Nature's Canvas",
        slug: 'natures-canvas',
        description: 'Capturing the raw beauty of natural landscapes in their purest form.',
        relatedItems: [
            { type: 'image', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60' },
            { type: 'video', videoId: '1058621851', hId: '3caccb6ab6' }
        ]
    },
    {
        id: 3,
        cols: 1,
        rows: 2,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1739403386250-080677ac4c53?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMzR8fHxlbnwwfHx8fHw%3D',
        title: 'Urban Oasis',
        slug: 'urban-oasis',
        description: 'A serene escape from the hustle and bustle of city life.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1726137569971-cdfa45c3138e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 4,
        cols: 1,
        rows: 2,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1734907865880-6eb669831b9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODB8fHxlbnwwfHx8fHw%3D',
        title: 'Rustic Charm',
        slug: 'rustic-charm',
        description: 'A cozy retreat that embodies the warmth of rural living.',
        relatedItems: [
            { type: 'video', videoId: '654321', hId: '654321' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1726137569971-cdfa45c3138e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 5,
        cols: 1,
        rows: 1,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1739531722390-04a6942231e2?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fHw%3D',
        title: 'Modern Minimalism',
        slug: 'modern-minimalism',
        description: 'A sleek and sophisticated design that celebrates simplicity.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 6,
        cols: 2,
        rows: 2,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1739582767192-3aa4d4811633?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Vibrant Culture',
        slug: 'vibrant-culture',
        description: 'A kaleidoscope of colors and textures that reflect the diversity of urban culture.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1726137569971-cdfa45c3138e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 7,
        cols: 1,
        rows: 2,
        type: 'image',
        image: 'https://plus.unsplash.com/premium_photo-1734549547939-41f90fdf91cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMzB8fHxlbnwwfHx8fHw%3D',
        title: 'Coastal Breeze',
        slug: 'coastal-breeze',
        description: 'A refreshing escape to the seaside, where the air is sweet and the views are breathtaking.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' }
        ]
    },
    {
        id: 8,
        cols: 2,
        rows: 3,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1737646099147-f2636ed6c1b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNTd8fHxlbnwwfHx8fHw%3D',
        title: 'Mountain Retreat',
        slug: 'mountain-retreat',
        description: "A secluded haven nestled in the mountains, where nature's beauty is on full display.",
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 9,
        cols: 1,
        rows: 3,
        type: 'vimeo',
        videoId: '1057103201',
        hId: '1ff8d3f9a0',
        title: 'Creative Motion',
        slug: 'creative-motion',
        description: 'An artistic exploration of movement and visual storytelling.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 10,
        cols: 1,
        rows: 3,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1586768798120-95597acaa6e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOTJ8fHxlbnwwfHx8fHw%3D',
        title: 'Urban Jungle',
        slug: 'urban-jungle',
        description: 'A fusion of nature and architecture, where the city meets the wild.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 11,
        cols: 2,
        rows: 2,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1738008896551-9ab767d9e6ac?q=80&w=2998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Rustic Elegance',
        slug: 'rustic-elegance',
        description: 'A charming blend of traditional and modern elements, creating a warm and inviting atmosphere.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 12,
        cols: 1,
        rows: 2,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1737380047092-e0cb34e12f84?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Cozy Corner',
        slug: 'cozy-corner',
        description: 'A snug and intimate space that invites relaxation and contemplation.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 13,
        cols: 2,
        rows: 1,
        type: 'image',
        image: 'https://plus.unsplash.com/premium_photo-1738637796692-d29db83fb7c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzODV8fHxlbnwwfHx8fHw%3D',
        title: 'Sunset Serenade',
        slug: 'sunset-serenade',
        description: 'A warm and romantic atmosphere, perfect for a peaceful evening.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' }
        ]
    },
    {
        id: 14,
        cols: 1,
        rows: 1,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1738748986807-bf1e6d00d58d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMjh8fHxlbnwwfHx8fHw%3D',
        title: 'Morning Dew',
        slug: 'morning-dew',
        description: 'A refreshing and revitalizing atmosphere, perfect for a new beginning.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 15,
        cols: 1,
        rows: 2,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1736794781970-ae55b6e3a13e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzODZ8fHxlbnwwfHx8fHw%3D',
        title: 'Seaside Escape',
        slug: 'seaside-escape',
        description: 'A tranquil and serene atmosphere, perfect for a relaxing getaway.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' }
        ]
    },
    {
        id: 16,
        cols: 1,
        rows: 2,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1739948044190-06307aa3ab18?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1Nnx8fGVufDB8fHx8fA%3D%3D',
        title: 'Mountain Peak',
        slug: 'mountain-peak',
        description: 'A breathtaking and awe-inspiring atmosphere, perfect for adventure seekers.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 17,
        cols: 2,
        rows: 2,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1738924349706-14d70715e236?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMzF8fHxlbnwwfHx8fHw%3D',
        title: 'Urban Oasis',
        slug: 'urban-oasis',
        description: 'A peaceful and serene atmosphere, perfect for a city retreat.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 18,
        cols: 2,
        rows: 4,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1739641375724-dfea74e0df69?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
        title: "Nature's Wonders",
        slug: 'natures-wonders',
        description: 'A breathtaking and awe-inspiring atmosphere, perfect for nature lovers.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 19,
        cols: 1,
        rows: 3,
        type: 'vimeo',
        videoId: '1057277973',
        hId: '4e87d1ba66',
        title: 'Creative Journey',
        slug: 'creative-journey',
        description: 'An artistic exploration of movement and visual storytelling.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 20,
        cols: 2,
        rows: 2,
        type: 'vimeo',
        videoId: '1057280811',
        hId: '17964124a8',
        title: 'Urban Rhythms',
        slug: 'urban-rhythms',
        description: 'A dynamic and energetic atmosphere, perfect for city dwellers.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 21,
        cols: 1,
        rows: 2,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1738273473785-99c1fc498c14?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MzJ8fHxlbnwwfHx8fHw%3D',
        title: 'Coastal Walk',
        slug: 'coastal-walk',
        description: 'A peaceful and serene atmosphere, perfect for a seaside stroll.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 22,
        cols: 1,
        rows: 3,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1736173155834-6cd98d8dc9fe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMDV8fHxlbnwwfHx8fHw%3D',
        title: 'Mountain Lake',
        slug: 'mountain-lake',
        description: 'A breathtaking and awe-inspiring atmosphere, perfect for nature lovers.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 23,
        cols: 1,
        rows: 3,
        type: 'image',
        image: 'https://plus.unsplash.com/premium_photo-1738091397333-48f0e514b467?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Urban Nights',
        slug: 'urban-nights',
        description: 'A dynamic and energetic atmosphere, perfect for city dwellers.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 24,
        cols: 1,
        rows: 3,
        type: 'image',
        image: 'https://images.unsplash.com/photo-1738162571972-d8337de941e7?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Coastal Cliffs',
        slug: 'coastal-cliffs',
        description: 'A breathtaking and awe-inspiring atmosphere, perfect for nature lovers.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 25,
        cols: 2,
        rows: 2,
        type: 'vimeo',
        videoId: '1057278002',
        hId: '64b3293a30',
        title: 'Creative Expression',
        slug: 'creative-expression',
        description: 'An artistic exploration of movement and visual storytelling.',
        relatedItems: [
            { type: 'video', videoId: '1058623325', hId: '475b69db9b' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    }
];

export default workItems;