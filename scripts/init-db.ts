/**
 * Database initialization script
 * 
 * This script:
 * 1. Tests database connection
 * 2. Creates database tables from SQL scripts
 * 3. Creates default admin user
 * 
 * Usage: pnpm db:init
 */

import 'dotenv/config'
import { sql, testConnection, executeRawSQL } from '../lib/db/connection'
import { hashPassword } from '../lib/auth/password'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function initializeDatabase() {
  console.log('🚀 Starting database initialization...\n')

  // 1. Test connection
  console.log('1️⃣ Testing database connection...')
  const isConnected = await testConnection()
  if (!isConnected) {
    console.error('❌ Database connection failed. Please check your DATABASE_URL.')
    process.exit(1)
  }

  // 2. Run SQL scripts
  console.log('\n2️⃣ Creating database tables...')
  
  try {
    // Read and execute admin tables script
    console.log('   Creating admin tables...')
    const adminTablesSQL = fs.readFileSync(
      path.join(__dirname, '01-create-admin-tables.sql'),
      'utf-8'
    )
    await sql(adminTablesSQL)
    console.log('   ✅ Admin tables created')

    // Read and execute CMS tables script
    console.log('   Creating CMS tables...')
    const cmsTablesSQL = fs.readFileSync(
      path.join(__dirname, '02-create-cms-tables.sql'),
      'utf-8'
    )
    await sql(cmsTablesSQL)
    console.log('   ✅ CMS tables created')
  } catch (error: any) {
    if (error.message.includes('already exists')) {
      console.log('   ℹ️  Tables already exist, skipping creation')
    } else {
      console.error('   ❌ Error creating tables:', error.message)
      throw error
    }
  }

  // 3. Create default admin user
  console.log('\n3️⃣ Creating default admin user...')
  
  try {
    // Check if admin user already exists
    const existingAdmin = await sql(
      "SELECT id FROM admin_users WHERE email = 'admin@example.com'"
    )

    if (existingAdmin.length > 0) {
      console.log('   ℹ️  Admin user already exists')
    } else {
      // Create admin user with hashed password
      const defaultPassword = 'admin123' // Change this!
      const hashedPassword = await hashPassword(defaultPassword)

      await sql(
        `INSERT INTO admin_users (email, name, password_hash, role, permissions)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          'admin@example.com',
          'Admin User',
          hashedPassword,
          'admin',
          JSON.stringify([
            'users.read', 'users.create', 'users.update', 'users.delete',
            'articles.read', 'articles.create', 'articles.update', 'articles.delete',
            'categories.read', 'categories.create', 'categories.update', 'categories.delete',
            'settings.read', 'settings.update'
          ])
        ]
      )

      console.log('   ✅ Admin user created')
      console.log('\n   📧 Email: admin@example.com')
      console.log('   🔑 Password: admin123')
      console.log('   ⚠️  IMPORTANT: Change this password after first login!')
    }
  } catch (error: any) {
    console.error('   ❌ Error creating admin user:', error.message)
    throw error
  }

  // 4. Create sample categories
  console.log('\n4️⃣ Creating sample categories...')
  
  try {
    const existingCategories = await sql('SELECT COUNT(*) as count FROM categories')
    
    if (parseInt(existingCategories[0]?.count || '0') === 0) {
      const sampleCategories = [
        { name: 'Technologie', slug: 'technologie', description: 'Články o technologiích', color: '#3b82f6' },
        { name: 'Design', slug: 'design', description: 'Články o designu', color: '#8b5cf6' },
        { name: 'Business', slug: 'business', description: 'Články o businessu', color: '#10b981' },
      ]

      for (const cat of sampleCategories) {
        await sql(
          'INSERT INTO categories (name, slug, description, color) VALUES ($1, $2, $3, $4)',
          [cat.name, cat.slug, cat.description, cat.color]
        )
      }
      
      console.log('   ✅ Sample categories created')
    } else {
      console.log('   ℹ️  Categories already exist, skipping')
    }
  } catch (error: any) {
    console.error('   ❌ Error creating categories:', error.message)
  }

  console.log('\n✅ Database initialization complete!\n')
  console.log('You can now start your application with: pnpm dev')
}

// Run initialization
initializeDatabase().catch((error) => {
  console.error('\n❌ Database initialization failed:', error)
  process.exit(1)
})
