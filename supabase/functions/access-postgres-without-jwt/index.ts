// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// deno-lint-ignore-file
// @ts-nocheck
import * as postgres from "postgres"
import { serve } from "std/server"
import { corsHeaders } from "../_shared/cors.ts"

// Get the connection string from the environment variable "DB_URL"
const databaseUrl = Deno.env.get('DB_URL')!

// Create a database pool with three connections that are lazily established
const pool = new postgres.Pool(databaseUrl, 3, true)

serve(async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Grab a connection from the pool
    const connection = await pool.connect()

    try {
      const result = await connection.queryObject<string>(
        "SELECT 'hello world' as message"
      )
      const count = result.rows[0]

      const body = count ? JSON.stringify(count, (key, value) => (typeof value === 'bigint' ? value.toString() : value)) : undefined
      const status = count ? 200 : 204

      // Return the response with the correct content type header
      return new Response(body, {
        status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
    } finally {
      // Release the connection back into the pool
      connection.release()
    }
  } catch (error: any) {
    console.error(error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' },
      status: 500,
    })
  }
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
