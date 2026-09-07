import { queries } from './router'

export async function handleDatabaseRequest(request: Request, db: any, headers: Record<string, string>): Promise<Response | null> {
    const url = new URL(request.url)
    const path = url.pathname

    if (!path.startsWith('/database/')) {
        return null
    }

    const queryName = path.substring('/database/'.length)
    const query = queries[queryName as keyof typeof queries]

    if (!query) {
        return new Response(
            JSON.stringify({ error: 'Database query not found' }),
            { status: 404, headers }
        )
    }

    const userId = Number(url.searchParams.get('user_id'))
    const budgetId = Number(url.searchParams.get('budget_id'))

    const result = await query(
        db,
        userId || 0,
        budgetId || 0
    )

    return new Response(
        JSON.stringify(result),
        { headers }
    )
}