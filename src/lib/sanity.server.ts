import { createClient } from '@sanity/client'

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_WRITE_TOKEN

// Ensure we have the required environment variables
if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}
if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')
}

// Warning for missing or placeholder write token
const isValidToken = token && 
  token !== 'your_sanity_write_token_here' && 
  token !== 'sk_test_or_sk_prod_YOUR_ACTUAL_TOKEN_HERE' &&
  token.startsWith('sk')

if (!isValidToken) {
  console.warn('⚠️  SANITY_WRITE_TOKEN not configured or invalid - contact form will log to console only')
  console.warn('   Get a token at: https://sanity.io/manage')
}

// Server-side Sanity client with write permissions
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  token: isValidToken ? token : undefined, // Only set token if valid
  useCdn: false, // Disable CDN for mutations
})