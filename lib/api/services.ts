import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface Service {
  id: number;
  attributes: {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    slug: string;
    icon?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface TeamMember {
  id: number;
  attributes: {
    name: string;
    nameAr: string;
    position: string;
    positionAr: string;
    bio?: string;
    bioAr?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
    image: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
          width: number;
          height: number;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Testimonial {
  id: number;
  attributes: {
    clientName: string;
    clientNameAr: string;
    clientPosition: string;
    clientPositionAr: string;
    testimonial: string;
    testimonialAr: string;
    image?: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface HeroSlide {
  id: number;
  attributes: {
    title: string;
    titleAr: string;
    subtitle?: string;
    subtitleAr?: string;
    media: {
      data: {
        id: number;
        attributes: {
          url: string;
          mime: string;
          alternativeText?: string;
        };
      };
    };
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Blog {
  id: number;
  attributes: {
    title: string;
    titleAr: string;
    slug: string;
    excerpt: string;
    excerptAr: string;
    content: string;
    contentAr: string;
    featuredImage?: {
      data: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    author?: string;
    authorAr?: string;
    publishDate: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Subscriber {
  email: string;
}

// API Functions
export const getServices = async (locale: string = 'en'): Promise<Service[]> => {
  try {
    const response = await api.get('/services', {
      params: {
        locale,
        populate: '*',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};

export const getService = async (slug: string, locale: string = 'en'): Promise<Service | null> => {
  try {
    const response = await api.get('/services', {
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        locale,
        populate: '*',
      },
    });
    return response.data.data[0] || null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
};

export const getTeamMembers = async (locale: string = 'en'): Promise<TeamMember[]> => {
  try {
    const response = await api.get('/team-members', {
      params: {
        locale,
        populate: '*',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
};

export const getTestimonials = async (locale: string = 'en'): Promise<Testimonial[]> => {
  try {
    const response = await api.get('/testimonials', {
      params: {
        locale,
        populate: '*',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

export const getHeroSlides = async (locale: string = 'en'): Promise<HeroSlide[]> => {
  try {
    const response = await api.get('/hero-slides', {
      params: {
        locale,
        populate: '*',
        sort: 'order:asc',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    return [];
  }
};

export const getBlogs = async (locale: string = 'en'): Promise<Blog[]> => {
  try {
    const response = await api.get('/blogs', {
      params: {
        locale,
        populate: '*',
        sort: 'publishDate:desc',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

export const getBlog = async (slug: string, locale: string = 'en'): Promise<Blog | null> => {
  try {
    const response = await api.get('/blogs', {
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        locale,
        populate: '*',
      },
    });
    return response.data.data[0] || null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
};

export const subscribeNewsletter = async (email: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await api.post('/subscribers', {
      data: {
        email,
      },
    });
    return { success: true };
  } catch (error: any) {
    if (error.response?.status === 400) {
      return { success: false, message: 'Email already subscribed' };
    }
    console.error('Error subscribing to newsletter:', error);
    return { success: false, message: 'An error occurred' };
  }
};

export const searchContent = async (query: string, locale: string = 'en') => {
  try {
    const [services, teamMembers] = await Promise.all([
      api.get('/services', {
        params: {
          filters: {
            $or: [
              { title: { $containsi: query } },
              { description: { $containsi: query } },
            ],
          },
          locale,
          populate: '*',
        },
      }),
      api.get('/team-members', {
        params: {
          filters: {
            $or: [
              { name: { $containsi: query } },
              { position: { $containsi: query } },
              { bio: { $containsi: query } },
            ],
          },
          locale,
          populate: '*',
        },
      }),
    ]);

    return {
      services: services.data.data,
      teamMembers: teamMembers.data.data,
    };
  } catch (error) {
    console.error('Error searching content:', error);
    return { services: [], teamMembers: [] };
  }
};

export const getImageUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
};