// Expose only the client-side supabase by default. Server-side code should
// import the admin client from 'lib/supabaseAdmin.js' explicitly.
export * from './supabaseClient'