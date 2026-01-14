export const API_END_POINT = "http://localhost:2020/api/v1";
export const categories = ["All", "Tech", "Philosophy", "Daily Living"]
export const quickLinks = ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"]
export const needHelp = ["Delivery Information", "Return & Refund Policy", "Payment Methods",
    "Track your Order", "Contact Us"]
export const followUs = ["Instagram", "Twitter", "Facebook", "YouTube"]
export const mockPosts = [
    // Tech Category (5 posts)
    {
        _id: '1',
        title: 'The Future of AI in Everyday Development',
        subTitle: 'How machine learning is reshaping how we write code',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop',
        content: '<h1>A comprehensive look at how AI tools are transforming software development workflows...<h1>',
        category: 'Tech',
        isPublished: true,
        likes: ['user1', 'user2', 'user3'],
        comments: ['comment1', 'comment2'],
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z'
    },
    {
        _id: '2',
        title: 'Understanding Quantum Computing Basics',
        subTitle: 'A beginner-friendly introduction to qubits and superposition',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
        content: 'Quantum computing might seem intimidating, but the core concepts are surprisingly accessible...',
        category: 'Tech',
        isPublished: false,
        likes: ['user1', 'user2', 'user3', 'user4'],
        comments: ['comment1', 'comment2', 'comment3'],
        createdAt: '2024-01-10T14:20:00Z',
        updatedAt: '2024-01-12T09:15:00Z'
    },
    {
        _id: '3',
        title: 'Web 3.0: Beyond the Hype',
        subTitle: 'Practical applications of decentralized technology',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w-400&h=250&fit=crop',
        content: 'Moving past cryptocurrency to explore real-world use cases for blockchain technology...',
        category: 'Tech',
        isPublished: true,
        likes: ['user1'],
        comments: ['comment1'],
        createdAt: '2024-01-05T16:45:00Z',
        updatedAt: '2024-01-05T16:45:00Z'
    },
    {
        _id: '4',
        title: 'The Minimalist Developer Toolkit',
        subTitle: 'Essential tools for maximum productivity',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop',
        content: 'In a world of endless tools and frameworks, sometimes less is more...',
        category: 'Tech',
        isPublished: false,
        likes: [],
        comments: [],
        createdAt: '2024-01-02T11:10:00Z',
        updatedAt: '2024-01-02T11:10:00Z'
    },
    {
        _id: '5',
        title: 'Sustainable Tech: Building Green Applications',
        subTitle: 'Reducing the carbon footprint of digital products',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop',
        content: 'How developers can contribute to environmental sustainability through code...',
        category: 'Tech',
        isPublished: true,
        likes: ['user1', 'user2', 'user3', 'user4', 'user5'],
        comments: ['comment1', 'comment2'],
        createdAt: '2023-12-28T09:00:00Z',
        updatedAt: '2023-12-30T15:20:00Z'
    },

    // Philosophy Category (5 posts)
    {
        _id: '6',
        title: 'Stoicism in the Digital Age',
        subTitle: 'Ancient wisdom for modern anxiety',
        image: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=400&h=250&fit=crop',
        content: 'How Marcus Aurelius might navigate social media and information overload...',
        category: 'Philosophy',
        isPublished: true,
        likes: ['user1', 'user2'],
        comments: ['comment1'],
        createdAt: '2024-01-14T13:25:00Z',
        updatedAt: '2024-01-14T13:25:00Z'
    },
    {
        _id: '7',
        title: 'The Ethics of Artificial Consciousness',
        subTitle: 'If machines could feel, what would we owe them?',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop',
        content: 'Exploring moral philosophy in the age of advanced AI...',
        category: 'Philosophy',
        isPublished: true,
        likes: ['user1', 'user2', 'user3', 'user4'],
        comments: ['comment1', 'comment2'],
        createdAt: '2024-01-08T15:40:00Z',
        updatedAt: '2024-01-09T10:10:00Z'
    },
    {
        _id: '8',
        title: 'Existentialism and Personal Responsibility',
        subTitle: 'Creating meaning in a seemingly indifferent universe',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop',
        content: 'Sartre, Camus, and the freedom (and burden) of choice...',
        category: 'Philosophy',
        isPublished: true,
        likes: ['user1'],
        comments: [],
        createdAt: '2024-01-03T12:00:00Z',
        updatedAt: '2024-01-03T12:00:00Z'
    },
    {
        _id: '9',
        title: 'The Philosophy of Minimalism',
        subTitle: 'Owning less to experience more',
        image: 'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=400&h=250&fit=crop',
        content: 'How simplifying possessions can lead to philosophical clarity...',
        category: 'Philosophy',
        isPublished: false,
        likes: [],
        comments: [],
        createdAt: '2023-12-29T17:30:00Z',
        updatedAt: '2023-12-29T17:30:00Z'
    },
    {
        _id: '10',
        title: 'Taoism and Modern Work-Life Balance',
        subTitle: 'Finding flow in a productivity-obsessed world',
        image: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?w=400&h=250&fit=crop',
        content: 'Wu wei: The art of effortless action in contemporary life...',
        category: 'Philosophy',
        isPublished: true,
        likes: ['user1', 'user2', 'user3'],
        comments: ['comment1'],
        createdAt: '2023-12-25T08:45:00Z',
        updatedAt: '2023-12-27T14:20:00Z'
    },

    // Daily Living Category (5 posts)
    {
        _id: '11',
        title: 'The Art of Mindful Mornings',
        subTitle: 'Starting your day with intention, not anxiety',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
        content: 'A simple 30-minute routine that transformed how I approach each day...',
        category: 'Daily Living',
        isPublished: true,
        likes: ['user1', 'user2', 'user3', 'user4', 'user5', 'user6'],
        comments: ['comment1', 'comment2', 'comment3'],
        createdAt: '2024-01-12T09:15:00Z',
        updatedAt: '2024-01-13T11:30:00Z'
    },
    {
        _id: '12',
        title: 'Digital Detox: A Weekend Experiment',
        subTitle: 'What I learned from 48 hours without screens',
        image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=250&fit=crop',
        content: 'Disconnecting to reconnect with myself and my surroundings...',
        category: 'Daily Living',
        isPublished: true,
        likes: ['user1', 'user2'],
        comments: ['comment1'],
        createdAt: '2024-01-07T14:50:00Z',
        updatedAt: '2024-01-07T14:50:00Z'
    },
    {
        _id: '13',
        title: 'Cooking as Meditation',
        subTitle: 'Finding mindfulness in the kitchen',
        image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=250&fit=crop',
        content: 'How preparing meals became my most therapeutic daily practice...',
        category: 'Daily Living',
        isPublished: true,
        likes: ['user1', 'user2', 'user3'],
        comments: ['comment1', 'comment2'],
        createdAt: '2024-01-01T18:20:00Z',
        updatedAt: '2024-01-02T10:45:00Z'
    },
    {
        _id: '14',
        title: 'The Lost Art of Letter Writing',
        subTitle: 'Why I still send handwritten notes',
        image: 'https://images.unsplash.com/photo-1565301660306-29e08751cc53?w=400&h=250&fit=crop',
        content: 'In an age of instant messaging, the slow communication of pen and paper...',
        category: 'Daily Living',
        isPublished: false,
        likes: [],
        comments: [],
        createdAt: '2023-12-26T16:10:00Z',
        updatedAt: '2023-12-26T16:10:00Z'
    },
    {
        _id: '15',
        title: 'Creating a Personal Sanctuary at Home',
        subTitle: 'Designing spaces for peace and creativity',
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=250&fit=crop',
        content: 'Transforming ordinary rooms into retreats for reflection and work...',
        category: 'Daily Living',
        isPublished: false,
        likes: ['user1', 'user2', 'user3', 'user4'],
        comments: ['comment1'],
        createdAt: '2023-12-20T12:30:00Z',
        updatedAt: '2023-12-22T09:45:00Z'
    }
];