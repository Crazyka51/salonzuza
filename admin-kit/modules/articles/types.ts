// Article types for CMS
export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  status: ArticleStatus
  categoryId?: string
  category?: Category
  authorId: string
  author?: AdminUser
  featuredImage?: string
  tags: string[]
  metaTitle?: string
  metaDescription?: string
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  viewCount: number
  isSticky: boolean
}

export type ArticleStatus = "draft" | "published" | "archived" | "scheduled"

export interface ArticleFormData {
  title: string
  slug?: string
  content: string
  excerpt?: string
  status: ArticleStatus
  categoryId?: string
  featuredImage?: string
  tags: string[]
  metaTitle?: string
  metaDescription?: string
  publishedAt?: string
  isSticky: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  parent?: Category
  children?: Category[]
  color?: string
  image?: string
  createdAt: Date
  updatedAt: Date
  articleCount: number
}

export interface CategoryFormData {
  name: string
  slug?: string
  description?: string
  parentId?: string
  color?: string
  image?: string
}

// Import AdminUser type
import type { AdminUser } from "../../core/types"