// src/lib/api/strapi-client.ts
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Helper function for fetch
async function strapiFetch<T>(
  endpoint: string,
  params: Record<string, any> = {},
): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${endpoint}`);

  // Add query params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (process.env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  try {
    const response = await fetch(url.toString(), { headers });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    throw error;
  }
}

// Types (keep your original types)
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

// API Functions (same as your original, just using fetch instead of axios)
export const getServices = async (
  locale: string = "en",
): Promise<Service[]> => {
  try {
    const response = await strapiFetch<{ data: Service[] }>("/services", {
      locale,
      populate: "*",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const getService = async (
  slug: string,
  locale: string = "en",
): Promise<Service | null> => {
  try {
    const response = await strapiFetch<{ data: Service[] }>("/services", {
      "filters[slug][$eq]": slug,
      locale,
      populate: "*",
    });
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
};

export const getTeamMembers = async (
  locale: string = "en",
): Promise<TeamMember[]> => {
  try {
    const response = await strapiFetch<{ data: TeamMember[] }>(
      "/team-members",
      {
        locale,
        populate: "*",
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
};

export const getTestimonials = async (
  locale: string = "en",
): Promise<Testimonial[]> => {
  try {
    const response = await strapiFetch<{ data: Testimonial[] }>(
      "/testimonials",
      {
        locale,
        populate: "*",
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};

export const getHeroSlides = async (
  locale: string = "en",
): Promise<HeroSlide[]> => {
  try {
    const response = await strapiFetch<{ data: HeroSlide[] }>("/hero-slides", {
      locale,
      populate: "*",
      sort: "order:asc",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
};

export const getBlogs = async (locale: string = "en"): Promise<Blog[]> => {
  try {
    const response = await strapiFetch<{ data: Blog[] }>("/blogs", {
      locale,
      populate: "*",
      sort: "publishDate:desc",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const getBlog = async (
  slug: string,
  locale: string = "en",
): Promise<Blog | null> => {
  try {
    const response = await strapiFetch<{ data: Blog[] }>("/blogs", {
      "filters[slug][$eq]": slug,
      locale,
      populate: "*",
    });
    return response.data[0] || null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

export const subscribeNewsletter = async (
  email: string,
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(`${STRAPI_URL}/api/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.STRAPI_API_TOKEN && {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        }),
      },
      body: JSON.stringify({
        data: { email },
      }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        return { success: false, message: "Email already subscribed" };
      }
      throw new Error(`HTTP ${response.status}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, message: "An error occurred" };
  }
};

export const searchContent = async (query: string, locale: string = "en") => {
  try {
    const [servicesResponse, teamResponse] = await Promise.all([
      strapiFetch<{ data: Service[] }>("/services", {
        "filters[$or][0][title][$containsi]": query,
        "filters[$or][1][description][$containsi]": query,
        locale,
        populate: "*",
      }),
      strapiFetch<{ data: TeamMember[] }>("/team-members", {
        "filters[$or][0][name][$containsi]": query,
        "filters[$or][1][position][$containsi]": query,
        "filters[$or][2][bio][$containsi]": query,
        locale,
        populate: "*",
      }),
    ]);

    return {
      services: servicesResponse.data,
      teamMembers: teamResponse.data,
    };
  } catch (error) {
    console.error("Error searching content:", error);
    return { services: [], teamMembers: [] };
  }
};

export const getImageUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
};
