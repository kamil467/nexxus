import { WorkItem } from "../api/supabase";


const workItems: WorkItem[] = [
   
    {
        id: 1,
        cols: 3,
        rows: 3,
        type: 'youtube',
        videoId: '4cdS0BA8P90',
        hId: '4f447e7fe9',
       // image: 'https://plus.unsplash.com/premium_photo-1739091068170-5486fbb36cff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMjV8fHxlbnwwfHx8fHw%3D',
        title: "Pre Wedding Shoot",
        slug: 'pre-wedding-shoot',
        description: 'Wedding cinematography that captures the essence of your love story',
        overview: 'A beautiful pre-wedding shoot that showcases the couple\'s journey and their special moments together. Our team specializes in creating timeless memories through artistic cinematography and storytelling.',
        capability: 'Wedding Cinematography, Creative Direction, Candid Photography, Story-Driven Narratives',
        team: 'Creative Director: Sarah Williams\nCinematographer: Michael Chen\nPhotographer: Emma Davis\nEditor: James Thompson',
        relatedItems: [
            { type: 'image', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60' },
            { type: 'video', videoId: '4cdS0BA8P90', hId: 'KiEt9WQdn7A' }
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
        id: 2,
        cols: 3,
        rows: 3,
        type: 'youtube',
      //  image: 'https://images.unsplash.com/photo-1586768798120-95597acaa6e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOTJ8fHxlbnwwfHx8fHw%3D',
      videoId: 'zJG2lmRFr0c',
      hId: '4875906def', 
      title: 'Village Grand Wedding',
      slug: 'village-grand-wedding',
      description: 'A cinematic celebration of traditional village wedding customs and modern love',
      overview: 'An enchanting wedding film that beautifully captures the rich traditions and vibrant celebrations of a village wedding. From traditional ceremonies to modern festivities, this film showcases the perfect blend of cultural heritage and contemporary romance.',
      capability: 'Traditional Wedding Documentation, Cultural Cinematography, Aerial Videography, Documentary Storytelling',
      team: 'Lead Cinematographer: David Kumar\nCultural Director: Priya Sharma\nAerial Photographer: Michael Chen\nLocal Traditions Consultant: Raj Patel',
        relatedItems: [
            { type: 'video', videoId: 'zJG2lmRFr0c', hId: '4875906def' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    {
        id: 3,
        cols: 3,
        rows: 3,
        type: 'vimeo',
        videoId: '1061002580',
        hId: '1ea606b5ac',
       // image: 'https://images.unsplash.com/photo-1737646099147-f2636ed6c1b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNTd8fHxlbnwwfHx8fHw%3D',
        title: 'Personal Branding',
        slug: 'personal-branding',
        description: 'A unique and personalized brand experience that sets you apart from the crowd.',
        capability: 'Brand Strategy, Brand Identity, Brand Management',
        team: 'Brand Manager: Jane Smith\nBrand Strategist: Alex Johnson',
        relatedItems: [
            { type: 'video', videoId: '1061002580', hId: '1ea606b5ac' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },

  

    
    {
        id: 2,
        cols: 1,
        rows: 3,
        type: 'vimeo',
      //  image: 'https://images.unsplash.com/photo-1737380047092-e0cb34e12f84?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
       videoId: '1061002700',
       hId: 'a4fcb113f3',  
      title: 'Wedding & Event shoots',
        slug: 'wedding-event-shoots',
        description: 'Bespoke Event Experiences',
        overview: 'Our team specializes in creating bespoke wedding and event experiences that seamlessly blend creativity with meticulous planning. We excel in venue selection, decor design, and coordination to ensure every detail is perfect.',
        capability: 'We offer a comprehensive range of services, including event planning, design and decor, vendor management, and on-site coordination. Our goal is to create memorable experiences that reflect the unique vision of each client.',
        team: '',
        relatedItems: [
            { type: 'video', videoId: '1061002700', hId: 'a4fcb113f3' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1737513090777-b87774e10186?q=80&w=2923&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
        ]
    },
    
   /*
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
    },*/
    /*
    {
        id: 15,
        cols: 2,
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
        videoId: '1060982636',
        hId: '6b718a7c08',
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
        */
];

export default workItems;