// Changed: Ensured comprehensive type definitions for search feature compatibility

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

// Changed: Added NewsletterSubscriber interface for newsletter subscription feature
export interface NewsletterSubscriber {
  id: string
  title: string
  slug: string
  metadata: {
    name: string
    email: string
  }
}