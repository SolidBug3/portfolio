import { createClient } from '@libsql/client/web'

interface Env {
    TURSO_DATABASE_URL: string
    TURSO_AUTH_TOKEN: string
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://solidbug.fr',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }

        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers
            })
        }

        const db = createClient({
            url: env.TURSO_DATABASE_URL,
            authToken: env.TURSO_AUTH_TOKEN
        })

        if (request.method === 'GET') {
            const result = await db.execute('SELECT 1 AS connected')

            return new Response(
                JSON.stringify(result.rows),
                {
                    headers
                }
            )
        }

        return new Response(
            JSON.stringify({
                error: 'Method not supported'
            }),
            {
                status: 405,
                headers
            }
        )
    }
}