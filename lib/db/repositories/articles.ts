git/**
 * Articles repository - handles all database operations for articles
 */

import { sql } from '../connection'
import type { QueryParams } from '../utils'
import { calculateOffset, buildOrderBy, buildSearchCondition } from '../utils'

export interface Article {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string | null
  status: 'draft' | 'published' | 'archived' | 'scheduled'
  category_id: number | null
  author_id: number
  featured_image: string | null
  tags: string[]
  meta_title: string | null
  meta_description: string | null
  published_at: Date | null
  created_at: Date
  updated_at: Date
  view_count: number
  is_sticky: boolean
}

export interface ArticleWithRelations extends Article {
  category?: {
    id: number
    name: string
    slug: string
    color: string
  }
  author?: {
    id: number
    name: string
    email: string
  }
}

/**
 * Get all articles with pagination and filters
 */
export async function getArticles(params: Partial<QueryParams> = {}) {
  const {
    page = 1,
    limit = 10,
    search,
    status,
    category,
    sortBy = 'created_at',
    sortOrder = 'desc'
  } = params

  const offset = calculateOffset(page, limit)
  const orderBy = buildOrderBy(sortBy, sortOrder)

  // Build WHERE conditions
  const conditions: string[] = []
  const queryParams: any[] = []
  let paramIndex = 1

  if (status) {
    conditions.push(`a.status = $${paramIndex}`)
    queryParams.push(status)
    paramIndex++
  }

  if (category) {
    conditions.push(`a.category_id = $${paramIndex}`)
    queryParams.push(parseInt(category))
    paramIndex++
  }

  if (search) {
    const searchCondition = buildSearchCondition(search, ['a.title', 'a.content', 'a.excerpt'])
    if (searchCondition.condition) {
      conditions.push(searchCondition.condition)
      queryParams.push(...searchCondition.params.map(() => `%${search}%`))
      paramIndex += searchCondition.params.length
    }
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  // Get articles with relations
  const articlesQuery = `
    SELECT 
      a.*,
      c.id as category_id,
      c.name as category_name,
      c.slug as category_slug,
      c.color as category_color,
      u.id as author_id,
      u.name as author_name,
      u.email as author_email
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    LEFT JOIN admin_users u ON a.author_id = u.id
    ${whereClause}
    ${orderBy}
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `

  queryParams.push(limit, offset)

  const articles = await sql(articlesQuery, queryParams)

  // Get total count
  const countQuery = `
    SELECT COUNT(*) as total
    FROM articles a
    ${whereClause}
  `
  const countResult = await sql(countQuery, queryParams.slice(0, -2))
  const total = parseInt(countResult[0]?.total || '0')

  return {
    data: articles.map(formatArticleWithRelations),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
}

/**
 * Get article by ID
 */
export async function getArticleById(id: number): Promise<ArticleWithRelations | null> {
  const result = await sql(`
    SELECT 
      a.*,
      c.id as category_id,
      c.name as category_name,
      c.slug as category_slug,
      c.color as category_color,
      u.id as author_id,
      u.name as author_name,
      u.email as author_email
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    LEFT JOIN admin_users u ON a.author_id = u.id
    WHERE a.id = $1
  `, [id])

  return result.length > 0 ? formatArticleWithRelations(result[0]) : null
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug: string): Promise<ArticleWithRelations | null> {
  const result = await sql(`
    SELECT 
      a.*,
      c.id as category_id,
      c.name as category_name,
      c.slug as category_slug,
      c.color as category_color,
      u.id as author_id,
      u.name as author_name,
      u.email as author_email
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    LEFT JOIN admin_users u ON a.author_id = u.id
    WHERE a.slug = $1
  `, [slug])

  return result.length > 0 ? formatArticleWithRelations(result[0]) : null
}

/**
 * Create new article
 */
export async function createArticle(data: Partial<Article>) {
  const result = await sql(`
    INSERT INTO articles (
      title, slug, content, excerpt, status, category_id, author_id,
      featured_image, tags, meta_title, meta_description, published_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
    )
    RETURNING *
  `, [
    data.title,
    data.slug,
    data.content,
    data.excerpt || null,
    data.status || 'draft',
    data.category_id || null,
    data.author_id,
    data.featured_image || null,
    JSON.stringify(data.tags || []),
    data.meta_title || null,
    data.meta_description || null,
    data.published_at || null
  ])

  return result[0]
}

/**
 * Update article
 */
export async function updateArticle(id: number, data: Partial<Article>) {
  const result = await sql(`
    UPDATE articles SET
      title = COALESCE($1, title),
      slug = COALESCE($2, slug),
      content = COALESCE($3, content),
      excerpt = COALESCE($4, excerpt),
      status = COALESCE($5, status),
      category_id = COALESCE($6, category_id),
      featured_image = COALESCE($7, featured_image),
      tags = COALESCE($8, tags),
      meta_title = COALESCE($9, meta_title),
      meta_description = COALESCE($10, meta_description),
      published_at = COALESCE($11, published_at),
      updated_at = NOW()
    WHERE id = $12
    RETURNING *
  `, [
    data.title,
    data.slug,
    data.content,
    data.excerpt,
    data.status,
    data.category_id,
    data.featured_image,
    data.tags ? JSON.stringify(data.tags) : null,
    data.meta_title,
    data.meta_description,
    data.published_at,
    id
  ])

  return result[0]
}

/**
 * Delete article
 */
export async function deleteArticle(id: number): Promise<boolean> {
  const result = await sql('DELETE FROM articles WHERE id = $1', [id])
  return result.length > 0
}

/**
 * Increment view count
 */
export async function incrementViewCount(id: number) {
  await sql('UPDATE articles SET view_count = view_count + 1 WHERE id = $1', [id])
}

/**
 * Get article statistics
 */
export async function getArticleStats() {
  const result = await sql(`
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE status = 'published') as published,
      COUNT(*) FILTER (WHERE status = 'draft') as draft,
      COUNT(*) FILTER (WHERE status = 'archived') as archived,
      SUM(view_count) as total_views
    FROM articles
  `)

  return result[0]
}

/**
 * Helper function to format article with relations
 */
function formatArticleWithRelations(row: any): ArticleWithRelations {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content,
    excerpt: row.excerpt,
    status: row.status,
    category_id: row.category_id,
    author_id: row.author_id,
    featured_image: row.featured_image,
    tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags,
    meta_title: row.meta_title,
    meta_description: row.meta_description,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
    view_count: row.view_count,
    is_sticky: row.is_sticky,
    category: row.category_name ? {
      id: row.category_id,
      name: row.category_name,
      slug: row.category_slug,
      color: row.category_color
    } : undefined,
    author: row.author_name ? {
      id: row.author_id,
      name: row.author_name,
      email: row.author_email
    } : undefined
  }
}
