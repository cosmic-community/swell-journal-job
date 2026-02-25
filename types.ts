export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Changed: Merged CosmicImage from types/index.ts
export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface Author {
  id: string
  title: string
  slug: string
  metadata: {
    name: string
    bio?: string
    profile_photo?: CosmicImage
  }
}

export interface Category {
  id: string
  title: string
  slug: string
  metadata: {
    name: string
    description?: string
  }
}

export interface Post {
  id: string
  title: string
  slug: string
  created_at?: string
  metadata: {
    content?: string
    featured_image?: CosmicImage
    author?: Author
    category?: Category
  }
}

// Changed: Merged NewsletterSubscriber from types/index.ts to resolve TS2305 error
export interface NewsletterSubscriber {
  id: string
  title: string
  slug: string
  metadata: {
    name: string
    email: string
  }
}