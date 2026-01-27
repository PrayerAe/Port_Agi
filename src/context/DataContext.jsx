import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

// Default data structure
const defaultData = {
  // Images
  images: {
    heroPhoto: null,
    aboutPhoto: null
  },

  // Hero Section
  hero: {
    name: 'Your Name',
    role: 'Creative Designer',
    description: 'Transforming ideas into stunning visual experiences. Specializing in UI/UX Design, Brand Identity, and Creative Direction.',
    stats: {
      projects: '50+',
      years: '3+',
      clients: '30+'
    },
    badge: 'Available for Freelance'
  },

  // About Section
  about: {
    intro: "I'm a passionate creative designer",
    description: "With years of experience in creating beautiful and functional designs, I help businesses and individuals bring their visions to life. My approach combines aesthetics with strategy to deliver impactful visual solutions that resonate with target audiences.",
    experience: '5+',
    highlights: [
      { icon: '🎨', title: 'Creative Vision', desc: 'Unique design perspectives' },
      { icon: '⚡', title: 'Fast Delivery', desc: 'Quick turnaround time' },
      { icon: '🤝', title: 'Collaboration', desc: 'Client-focused approach' },
      { icon: '✨', title: 'Attention to Detail', desc: 'Pixel-perfect designs' }
    ],
    stats: [
      { number: '50+', label: 'Projects Completed' },
      { number: '30+', label: 'Happy Clients' },
      { number: '5+', label: 'Years Experience' },
      { number: '15+', label: 'Awards Won' }
    ]
  },

  // Skills Section
  skills: {
    description: 'I specialize in creating beautiful, functional designs using industry-leading tools and technologies.',
    tools: [
      { icon: '🎨', name: 'Figma', desc: 'UI/UX Design', level: 95 },
      { icon: '🖼️', name: 'Canva', desc: 'Graphic Design', level: 90 },
      { icon: '💜', name: 'Adobe XD', desc: 'Prototyping', level: 85 },
      { icon: '📷', name: 'Photoshop', desc: 'Photo Editing', level: 88 }
    ],
    bars: [
      { name: 'UI/UX Design', percentage: 95 },
      { name: 'Brand Identity', percentage: 90 },
      { name: 'Illustration', percentage: 85 },
      { name: 'Motion Design', percentage: 80 }
    ],
    services: [
      { icon: '🎯', title: 'UI/UX Design', desc: 'User-centered design solutions' },
      { icon: '🏷️', title: 'Brand Identity', desc: 'Memorable brand experiences' },
      { icon: '📱', title: 'Mobile Design', desc: 'App interfaces that delight' },
      { icon: '🌐', title: 'Web Design', desc: 'Stunning website designs' }
    ]
  },

  // Portfolio Section
  portfolio: {
    categories: ['All', 'UI/UX', 'Branding', 'Illustration', 'Web Design'],
    projects: [
      {
        id: 1,
        title: 'E-Commerce App',
        category: 'UI/UX',
        description: 'A modern shopping experience with intuitive navigation',
        image: '🛒',
        tools: ['Figma', 'Protopie'],
        color: '#ff6b9d'
      },
      {
        id: 2,
        title: 'Brand Identity',
        category: 'Branding',
        description: 'Complete brand identity for a tech startup',
        image: '🎨',
        tools: ['Illustrator', 'Photoshop'],
        color: '#ec4899'
      },
      {
        id: 3,
        title: 'Mobile Banking',
        category: 'UI/UX',
        description: 'Secure and user-friendly banking application',
        image: '💳',
        tools: ['Figma', 'Principle'],
        color: '#db2777'
      },
      {
        id: 4,
        title: 'Illustration Set',
        category: 'Illustration',
        description: 'Custom illustration pack for marketing',
        image: '🖼️',
        tools: ['Procreate', 'Illustrator'],
        color: '#f472b6'
      },
      {
        id: 5,
        title: 'Restaurant Website',
        category: 'Web Design',
        description: 'Elegant website for fine dining experience',
        image: '🍽️',
        tools: ['Figma', 'Webflow'],
        color: '#be185d'
      },
      {
        id: 6,
        title: 'Fitness App',
        category: 'UI/UX',
        description: 'Health tracking with gamification elements',
        image: '💪',
        tools: ['Sketch', 'Figma'],
        color: '#ff1493'
      }
    ]
  },

  // Contact Section
  contact: {
    title: "Let's Work Together",
    description: "Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.",
    email: 'hello@yourname.com',
    phone: '+1 234 567 890',
    location: 'Jakarta, Indonesia',
    socials: {
      behance: '#',
      dribbble: '#',
      instagram: '#',
      linkedin: '#'
    }
  },

  // Footer
  footer: {
    tagline: 'Creating beautiful digital experiences that inspire and engage users worldwide.',
    copyright: '2024 Your Name. All rights reserved.'
  },

  // Admin credentials
  admin: {
    username: 'admin',
    password: 'admin123'
  }
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : defaultData;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('adminLoggedIn') === 'true';
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('adminLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  const updateSection = (section, newData) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...newData }
    }));
  };

  const updateNestedData = (section, key, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const login = (username, password) => {
    if (username === data.admin.username && password === data.admin.password) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const resetToDefault = () => {
    setData(defaultData);
  };

  return (
    <DataContext.Provider value={{
      data,
      setData,
      updateSection,
      updateNestedData,
      isLoggedIn,
      login,
      logout,
      resetToDefault
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
