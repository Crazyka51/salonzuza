/**
 * Simple database initialization script
 * Run with: pnpm db:init
 */

import { sql, testConnection, executeRawSQL } from '../lib/db/connection.js'
import { hashPassword } from '../lib/auth/password.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function initializeDatabase() {
  console.log('🚀 Starting database initialization...\n')

  // 1. Test connection
  console.log('1️⃣  Testing database connection...')
  const isConnected = await testConnection()
  if (!isConnected) {
    console.error('❌ Database connection failed. Please check your DATABASE_URL.')
    process.exit(1)
  }

  // 2. Run SQL scripts
  console.log('\n2️⃣  Creating database tables...')
  
  try {
    // Read SQL files
    const adminTablesSQL = fs.readFileSync(
      path.join(__dirname, '01-create-admin-tables.sql'),
      'utf-8'
    )
    const cmsTablesSQL = fs.readFileSync(
      path.join(__dirname, '02-create-cms-tables.sql'),
      'utf-8'
    )

    // Execute SQL scripts
    console.log('   Creating admin tables...')
    await executeRawSQL(adminTablesSQL)
    console.log('   ✅ Admin tables created')

    console.log('   Creating CMS tables...')
    await executeRawSQL(cmsTablesSQL)
    console.log('   ✅ CMS tables created')
  } catch (error) {
    if (error.message && error.message.includes('already exists')) {
      console.log('   ℹ️  Tables already exist, skipping creation')
    } else {
      console.error('   ❌ Error creating tables:', error.message || error)
      throw error
    }
  }

  // 3. Create default admin user
  console.log('\n3️⃣  Creating default admin user...')
  
  try {
    // Check if admin user exists
    const existingAdmin = await sql`
      SELECT id FROM admin_users WHERE email = 'admin@example.com'
    `

    if (existingAdmin.length > 0) {
      console.log('   ℹ️  Admin user already exists')
    } else {
      // Create admin user
      const defaultPassword = 'admin123'
      const hashedPassword = await hashPassword(defaultPassword)
      const permissions = JSON.stringify([
        'users.read', 'users.create', 'users.update', 'users.delete',
        'articles.read', 'articles.create', 'articles.update', 'articles.delete',
        'categories.read', 'categories.create', 'categories.update', 'categories.delete',
        'settings.read', 'settings.update'
      ])

      await sql`
        INSERT INTO admin_users (email, name, password_hash, role, permissions)
        VALUES ('admin@example.com', 'Admin User', ${hashedPassword}, 'admin', ${permissions})
      `

      console.log('   ✅ Admin user created')
      console.log('\n   📧 Email: admin@example.com')
      console.log('   🔑 Password: admin123')
      console.log('   ⚠️  IMPORTANT: Change this password after first login!')
    }
  } catch (error) {
    console.error('   ❌ Error creating admin user:', error.message || error)
    throw error
  }

  // 4. Create sample categories
  console.log('\n4️⃣  Creating sample categories...')
  
  try {
    const existingCategories = await sql`SELECT COUNT(*) as count FROM categories`
    
    if (Number(existingCategories[0]?.count || 0) === 0) {
      await sql`
        INSERT INTO categories (name, slug, description, color) VALUES
        ('Technologie', 'technologie', 'Články o technologiích', '#3b82f6'),
        ('Design', 'design', 'Články o designu', '#8b5cf6'),
        ('Business', 'business', 'Články o businessu', '#10b981')
      `
      
      console.log('   ✅ Sample categories created')
    } else {
      console.log('   ℹ️  Categories already exist, skipping')
    }
  } catch (error) {
    console.error('   ❌ Error creating categories:', error.message || error)
  }

  console.log('\n✅ Database initialization complete!\n')
  console.log('Next steps:')
  console.log('1. Start the dev server: pnpm dev')
  console.log('2. Visit http://localhost:3000/admin/login')
  console.log('3. Login with admin@example.com / admin123')
  console.log('4. Change the default password\n')
}

// Run initialization
initializeDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\n❌ Database initialization failed:', error)
    process.exit(1)
  })
