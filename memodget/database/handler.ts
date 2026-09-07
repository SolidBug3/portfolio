import { queries } from './router'

export async function handleDatabaseRequest(request: Request, db: any, headers: Record<string, string>): Promise<Response | null> {
    const path = new URL(request.url).pathname

    if (!path.startsWith('/database/')) { return null }

    const queryName = path.substring('/database/'.length)
    const query = queries[queryName as keyof typeof queries]

    if (!query) { return new Response(JSON.stringify({ error: 'Database query not found' }), { status: 404, headers }) }

    const url = new URL(request.url)
    const userId = Number(url.searchParams.get('user_id'))
    const budgetId = Number(url.searchParams.get('budget_id'))

    if (!userId || !budgetId) {
        return new Response(JSON.stringify({ error: 'Missing user_id or budget_id' }), { status: 400, headers })
    }

    const result = await query(db, userId, budgetId)

    return new Response(JSON.stringify(result), { headers })
}