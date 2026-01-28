/**
 * Test database connection
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file
config({ path: resolve(process.cwd(), '.env.local') })

import { testConnection } from '../lib/db/connection'

testConnection().then((success) => {
  process.exit(success ? 0 : 1)
})
