/**
 * Users repository - handles all database operations for admin users
 */

import { sql } from '../connection'
import type { QueryParams } from '../utils'
import { calculateOffset, buildOrderBy, buildSearchCondition } from '../utils'

export interface AdminUser {
  id: number
  email: string
  name: string | null
  password_hash: string
  role: string
  permissions: string[]
  created_at: Date
  updated_at: Date
}

export interface AdminUserSafe extends Omit<AdminUser, 'password_hash'> {}

/**
 * Get all users with pagination
 */
export async function getUsers(params: Partial<QueryParams> = {}) {
  const {
    page = 1,
    limit = 10,
    search,
    sortBy = 'created_at',
    sortOrder = 'desc'
  } = params

  const offset = calculateOffset(page, limit)
  const orderBy = buildOrderBy(sortBy, sortOrder)

  const conditions: string[] = []
  const queryParams: any[] = []
  let paramIndex = 1

  if (search) {
    const searchCondition = buildSearchCondition(search, ['name', 'email'])
    if (searchCondition.condition) {
      conditions.push(searchCondition.condition)
      queryParams.push(...searchCondition.params.map(() => `%${search}%`))
      paramIndex += searchCondition.params.length
    }
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  const usersQuery = `
    SELECT id, email, name, role, permissions, created_at, updated_at
    FROM admin_users
    ${whereClause}
    ${orderBy}
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `

  queryParams.push(limit, offset)
  const users = await sql(usersQuery, queryParams)

  const countQuery = `SELECT COUNT(*) as total FROM admin_users ${whereClause}`
  const countResult = await sql(countQuery, queryParams.slice(0, -2))
  const total = parseInt(countResult[0]?.total || '0')

  return {
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
}

/**
 * Get user by ID (without password)
 */
export async function getUserById(id: number): Promise<AdminUserSafe | null> {
  const result = await sql(
    'SELECT id, email, name, role, permissions, created_at, updated_at FROM admin_users WHERE id = $1',
    [id]
  )
  return result.length > 0 ? result[0] : null
}

/**
 * Get user by email (with password for authentication)
 */
export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  const result = await sql('SELECT * FROM admin_users WHERE email = $1', [email])
  return result.length > 0 ? result[0] : null
}

/**
 * Create new user
 */
export async function createUser(data: {
  email: string
  name: string
  password_hash: string
  role?: string
  permissions?: string[]
}): Promise<AdminUserSafe> {
  const result = await sql(
    `INSERT INTO admin_users (email, name, password_hash, role, permissions)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, email, name, role, permissions, created_at, updated_at`,
    [
      data.email,
      data.name,
      data.password_hash,
      data.role || 'user',
      JSON.stringify(data.permissions || [])
    ]
  )
  return result[0]
}

/**
 * Update user
 */
export async function updateUser(
  id: number,
  data: Partial<Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>>
): Promise<AdminUserSafe> {
  const result = await sql(
    `UPDATE admin_users SET
      email = COALESCE($1, email),
      name = COALESCE($2, name),
      password_hash = COALESCE($3, password_hash),
      role = COALESCE($4, role),
      permissions = COALESCE($5, permissions),
      updated_at = NOW()
    WHERE id = $6
    RETURNING id, email, name, role, permissions, created_at, updated_at`,
    [
      data.email,
      data.name,
      data.password_hash,
      data.role,
      data.permissions ? JSON.stringify(data.permissions) : null,
      id
    ]
  )
  return result[0]
}

/**
 * Delete user
 */
export async function deleteUser(id: number): Promise<boolean> {
  const result = await sql('DELETE FROM admin_users WHERE id = $1', [id])
  return result.length > 0
}

/**
 * Check if user has permission
 */
export function hasPermission(user: AdminUser | AdminUserSafe, permission: string): boolean {
  if (user.role === 'admin') return true
  
  const permissions = typeof user.permissions === 'string' 
    ? JSON.parse(user.permissions) 
    : user.permissions
    
  return permissions.includes(permission)
}
