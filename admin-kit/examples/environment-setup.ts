// Example environment variable setup for different authentication providers

export const environmentExamples = {
  // JWT Authentication (Recommended)
  jwt: {
    required: ["JWT_SECRET=nK8mP2vR9sT4wX7zA3bC6eF1gH5jL8nQ2rS5uV8yB1dE4fG7hJ0kM3pN6qT9wZ2"],
    optional: [
      "DATABASE_URL=postgresql://neondb_owner:npg_9X0OfSNxFydi@ep-wispy-cloud-agr15smi-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require",
    ],
  },

  // Stack Auth Integration (Server-side only)
  stackAuth: {
    required: [
      "NEXT_PUBLIC_STACK_PROJECT_ID=ca8fd961-829b-4c25-b922-c5da7bfd3803",
      "STACK_SECRET_SERVER_KEY=ssk_m7hh5bpkc8pzb3f8bw1sd5tvae09ntdbrvattj31a4q70",
    ],
    note: "Stack Auth client integration should be handled separately in your app",
    optional: ["JWT_SECRET=nK8mP2vR9sT4wX7zA3bC6eF1gH5jL8nQ2rS5uV8yB1dE4fG7hJ0kM3pN6qT9wZ2"],
  },

  // Database Integration (Neon)
  database: {
    required: [
      "DATABASE_URL=postgresql://neondb_owner:npg_9X0OfSNxFydi@ep-wispy-cloud-agr15smi-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require",
    ],
    optional: [
      "DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_9X0OfSNxFydi@ep-wispy-cloud-agr15smi.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require",
    ],
  },
}

// Generate a secure JWT secret
export function generateJWTSecret(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
  let result = ""
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Validate environment setup
export function validateEnvironment(provider: "jwt" | "stack-auth" = "jwt") {
  const errors: string[] = []

  if (provider === "jwt") {
    if (!process.env.JWT_SECRET) {
      errors.push("JWT_SECRET is required for JWT authentication")
    } else if (process.env.JWT_SECRET.length < 32) {
      errors.push("JWT_SECRET should be at least 32 characters long")
    }
  }

  if (provider === "stack-auth") {
    if (!process.env.NEXT_PUBLIC_STACK_PROJECT_ID) {
      errors.push("NEXT_PUBLIC_STACK_PROJECT_ID is required for Stack Auth")
    }
    if (!process.env.STACK_SECRET_SERVER_KEY) {
      errors.push("STACK_SECRET_SERVER_KEY is required for Stack Auth")
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
