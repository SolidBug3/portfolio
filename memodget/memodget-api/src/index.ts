import { createClient } from '@libsql/client/web'
import { createRemoteJWKSet, jwtVerify } from 'jose'
import { handleDatabaseRequest } from '../../database/handler'

interface Env {
    TURSO_DATABASE_URL: string
    TURSO_AUTH_TOKEN: string
    GOOGLE_CLIENT_ID: string
}

const GOOGLE_JWKS = createRemoteJWKSet(
    new URL('https://www.googleapis.com/oauth2/v3/certs')
)

function createSessionToken(): string {
    const bytes = new Uint8Array(32)

    crypto.getRandomValues(bytes)

    return Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const origin = request.headers.get('Origin')

        const allowedOrigins = [
            'http://localhost:5173',
            'https://solidbug.fr'
        ]

        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': allowedOrigins.includes(origin ?? '')
                ? origin!
                : 'https://solidbug.fr',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
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

        const path = new URL(request.url).pathname

        const databaseResponse = await handleDatabaseRequest(
            request,
            db,
            headers
        )

        if (databaseResponse) {
            return databaseResponse
        }

        if (
            request.method === 'POST' &&
            path === '/auth/google'
        ) {
            try {
                const body = await request.json() as {
                    credential?: string
                }

                if (!body.credential) {
                    return new Response(
                        JSON.stringify({
                            error: 'Missing Google credential'
                        }),
                        {
                            status: 400,
                            headers
                        }
                    )
                }

                const { payload } = await jwtVerify(
                    body.credential,
                    GOOGLE_JWKS,
                    {
                        issuer: 'https://accounts.google.com',
                        audience: env.GOOGLE_CLIENT_ID
                    }
                )

                if (!payload.sub || !payload.email) {
                    return new Response(
                        JSON.stringify({
                            error: 'Google token is missing required information'
                        }),
                        {
                            status: 401,
                            headers
                        }
                    )
                }

                const googleId = payload.sub
                const email = payload.email
                const name = typeof payload.name === 'string'
                    ? payload.name
                    : null

                const existingUser = await db.execute({
                    sql: `
                        SELECT id, google_id, email, name
                        FROM users
                        WHERE google_id = ?
                    `,
                    args: [googleId]
                })

                let user

                if (existingUser.rows.length > 0) {
                    user = existingUser.rows[0]
                } else {
                    const createdUser = await db.execute({
                        sql: `
                            INSERT INTO users (google_id, email, name)
                            VALUES (?, ?, ?)
                        `,
                        args: [googleId, email, name]
                    })

                    user = {
                        id: Number(createdUser.lastInsertRowid),
                        google_id: googleId,
                        email,
                        name
                    }
                }

                const sessionToken = createSessionToken()

                await db.execute({
                    sql: `
                        CREATE TABLE IF NOT EXISTS sessions (
                            token TEXT PRIMARY KEY,
                            user_id INTEGER NOT NULL,
                            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
                        )
                    `,
                    args: []
                })

                await db.execute({
                    sql: `
                        INSERT INTO sessions (token, user_id)
                        VALUES (?, ?)
                    `,
                    args: [sessionToken, user.id]
                })

                return new Response(
                    JSON.stringify({
                        authenticated: true,
                        user: {
                            id: user.id,
                            email: user.email,
                            name: user.name
                        },
                        session_token: sessionToken
                    }),
                    {
                        headers
                    }
                )
            } catch {
                return new Response(
                    JSON.stringify({
                        error: 'Invalid Google credential'
                    }),
                    {
                        status: 401,
                        headers
                    }
                )
            }
        }

        if (
            request.method === 'GET' &&
            path === '/auth/me'
        ) {
            try {
                const authorization = request.headers.get('Authorization')

                if (!authorization?.startsWith('Bearer ')) {
                    return new Response(
                        JSON.stringify({
                            authenticated: false
                        }),
                        {
                            status: 401,
                            headers
                        }
                    )
                }

                const sessionToken = authorization.substring(7)

                const result = await db.execute({
                    sql: `
                        SELECT
                            users.id,
                            users.email,
                            users.name
                        FROM sessions
                        INNER JOIN users
                            ON users.id = sessions.user_id
                        WHERE sessions.token = ?
                    `,
                    args: [sessionToken]
                })

                if (result.rows.length === 0) {
                    return new Response(
                        JSON.stringify({
                            authenticated: false
                        }),
                        {
                            status: 401,
                            headers
                        }
                    )
                }

                return new Response(
                    JSON.stringify({
                        authenticated: true,
                        user: result.rows[0]
                    }),
                    {
                        headers
                    }
                )
            } catch {
                return new Response(
                    JSON.stringify({
                        authenticated: false
                    }),
                    {
                        status: 401,
                        headers
                    }
                )
            }
        }

        if (
            request.method === 'POST' &&
            path === '/auth/logout'
        ) {
            try {
                const body = await request.json() as {
                    session_token?: string
                }

                if (body.session_token) {
                    await db.execute({
                        sql: `
                            DELETE FROM sessions
                            WHERE token = ?
                        `,
                        args: [body.session_token]
                    })
                }

                return new Response(
                    JSON.stringify({
                        logged_out: true
                    }),
                    {
                        headers
                    }
                )
            } catch {
                return new Response(
                    JSON.stringify({
                        error: 'Logout failed'
                    }),
                    {
                        status: 500,
                        headers
                    }
                )
            }
        }

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