/**
 * Simple database init - creates tables and admin user manually
 */

import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

import { sql } from '../lib/db/connection'
import { hashPassword } from '../lib/auth/password'

async function initDB() {
  console.log('🚀 Database Initialization\n')

  try {
    // Test connection
    console.log('Testing connection...')
    await sql`SELECT 1`
    console.log('✅ Connected\n')

    // Create admin users table
    console.log('Creating admin_users table...')
    await sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        password_hash VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        permissions JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `
    await sql`CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email)`
    console.log('✅ admin_users table ready\n')

    // Create categories table
    console.log('Creating categories table...')
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        color VARCHAR(7) DEFAULT '#6b7280',
        image VARCHAR(500),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `
    console.log('✅ categories table ready\n')

    // Create articles table
    console.log('Creating articles table...')
    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        status VARCHAR(20) DEFAULT 'draft',
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        author_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
        featured_image VARCHAR(500),
        tags JSONB DEFAULT '[]',
        meta_title VARCHAR(60),
        meta_description VARCHAR(160),
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        view_count INTEGER DEFAULT 0,
        is_sticky BOOLEAN DEFAULT FALSE
      )
    `
    console.log('✅ articles table ready\n')

    // Check if admin exists
    const existingAdmin = await sql`SELECT id FROM admin_users WHERE email = 'admin@example.com'`
    
    if (existingAdmin.length > 0) {
      console.log('ℹ️  Admin user already exists\n')
    } else {
      console.log('Creating admin user...')
      const password = 'admin123'
      const passwordHash = await hashPassword(password)
      const permissions = JSON.stringify([
        'users.read', 'users.create', 'users.update', 'users.delete',
        'articles.read', 'articles.create', 'articles.update', 'articles.delete',
        'categories.read', 'categories.create', 'categories.update', 'categories.delete',
        'settings.read', 'settings.update'
      ])

      await sql`
        INSERT INTO admin_users (email, name, password_hash, role, permissions)
        VALUES ('admin@example.com', 'Admin User', ${passwordHash}, 'admin', ${permissions})
      `

      console.log('✅ Admin user created')
      console.log('   📧 Email: admin@example.com')
      console.log('   🔑 Password: admin123')
      console.log('   ⚠️  Change password after first login!\n')
    }

    // Create sample categories
    const catCount = await sql`SELECT COUNT(*) as count FROM categories`
    if (Number(catCount[0].count) === 0) {
      console.log('Creating sample categories...')
      await sql`
        INSERT INTO categories (name, slug, description, color) VALUES
        ('Technologie', 'technologie', 'Články o technologiích', '#3b82f6'),
        ('Design', 'design', 'Články o designu', '#8b5cf6'),
        ('Business', 'business', 'Články o businessu', '#10b981')
      `
      console.log('✅ Sample categories created\n')
    } else {
      console.log('ℹ️  Categories already exist\n')
    }

    console.log('✅ Database initialization complete!\n')
    console.log('Next steps:')
    console.log('1. Run: pnpm dev')
    console.log('2. Visit: http://localhost:3000/admin/login')
    console.log('3. Login with admin@example.com / admin123\n')

  } catch (error: any) {
    console.error('❌ Error:', error.message || error)
    throw error
  }
}

initDB()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
