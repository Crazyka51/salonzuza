/**
 * Categories repository - handles all database operations for categories
 */

import { sql } from '../connection'
import type { QueryParams } from '../utils'
import { calculateOffset, buildOrderBy } from '../utils'

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  parent_id: number | null
  color: string
  image: string | null
  created_at: Date
  updated_at: Date
}

export interface CategoryWithCount extends Category {
  article_count: number
}

/**
 * Get all categories with article counts
 */
export async function getCategories(params: Partial<QueryParams> = {}) {
  const {
    page = 1,
    limit = 50,
    sortBy = 'name',
    sortOrder = 'asc'
  } = params

  const offset = calculateOffset(page, limit)
  const orderBy = buildOrderBy(sortBy, sortOrder)

  const query = `
    SELECT 
      c.*,
      COUNT(a.id) as article_count
    FROM categories c
    LEFT JOIN articles a ON c.id = a.category_id
    GROUP BY c.id
    ${orderBy}
    LIMIT $1 OFFSET $2
  `

  const categories = await sql(query, [limit, offset])

  const countResult = await sql('SELECT COUNT(*) as total FROM categories')
  const total = parseInt(countResult[0]?.total || '0')

  return {
    data: categories,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
}

/**
 * Get category by ID
 */
export async function getCategoryById(id: number): Promise<CategoryWithCount | null> {
  const result = await sql(`
    SELECT 
      c.*,
      COUNT(a.id) as article_count
    FROM categories c
    LEFT JOIN articles a ON c.id = a.category_id
    WHERE c.id = $1
    GROUP BY c.id
  `, [id])

  return result.length > 0 ? result[0] : null
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<CategoryWithCount | null> {
  const result = await sql(`
    SELECT 
      c.*,
      COUNT(a.id) as article_count
    FROM categories c
    LEFT JOIN articles a ON c.id = a.category_id
    WHERE c.slug = $1
    GROUP BY c.id
  `, [slug])

  return result.length > 0 ? result[0] : null
}

/**
 * Get hierarchical categories (parent with children)
 */
export async function getCategoriesHierarchical() {
  const allCategories = await sql(`
    SELECT 
      c.*,
      COUNT(a.id) as article_count
    FROM categories c
    LEFT JOIN articles a ON c.id = a.category_id
    GROUP BY c.id
    ORDER BY c.name ASC
  `)

  // Build hierarchy
  const categoriesMap = new Map()
  const rootCategories: any[] = []

  allCategories.forEach((cat: any) => {
    categoriesMap.set(cat.id, { ...cat, children: [] })
  })

  allCategories.forEach((cat: any) => {
    const category = categoriesMap.get(cat.id)
    if (cat.parent_id) {
      const parent = categoriesMap.get(cat.parent_id)
      if (parent) {
        parent.children.push(category)
      }
    } else {
      rootCategories.push(category)
    }
  })

  return rootCategories
}

/**
 * Create new category
 */
export async function createCategory(data: Partial<Category>) {
  const result = await sql(`
    INSERT INTO categories (name, slug, description, parent_id, color, image)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `, [
    data.name,
    data.slug,
    data.description || null,
    data.parent_id || null,
    data.color || '#6b7280',
    data.image || null
  ])

  return result[0]
}

/**
 * Update category
 */
export async function updateCategory(id: number, data: Partial<Category>) {
  const result = await sql(`
    UPDATE categories SET
      name = COALESCE($1, name),
      slug = COALESCE($2, slug),
      description = COALESCE($3, description),
      parent_id = COALESCE($4, parent_id),
      color = COALESCE($5, color),
      image = COALESCE($6, image),
      updated_at = NOW()
    WHERE id = $7
    RETURNING *
  `, [
    data.name,
    data.slug,
    data.description,
    data.parent_id,
    data.color,
    data.image,
    id
  ])

  return result[0]
}

/**
 * Delete category
 */
export async function deleteCategory(id: number): Promise<boolean> {
  // Check if category has articles
  const articlesCount = await sql(
    'SELECT COUNT(*) as count FROM articles WHERE category_id = $1',
    [id]
  )

  if (parseInt(articlesCount[0]?.count || '0') > 0) {
    throw new Error('Cannot delete category with articles')
  }

  const result = await sql('DELETE FROM categories WHERE id = $1', [id])
  return result.length > 0
}

/**
 * Get category statistics
 */
export async function getCategoryStats() {
  const result = await sql(`
    SELECT 
      COUNT(*) as total_categories,
      COUNT(*) FILTER (WHERE parent_id IS NULL) as root_categories,
      COUNT(*) FILTER (WHERE parent_id IS NOT NULL) as sub_categories
    FROM categories
  `)

  return result[0]
}
