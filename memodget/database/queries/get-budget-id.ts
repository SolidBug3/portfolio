import type { Client } from '@libsql/client'

export async function getBudgetIdQuery(db: Client, params: Record<string, string>) {
    const userId = Number(params.user_id)
    const year = Number(params.year)
    const month = Number(params.month)

    const result = await db.execute({
        sql: `
            SELECT id
            FROM budgets
            WHERE user_id = ?
            AND year = ?
            AND month = ?
        `,
        args: [userId, year, month]
    })

    return result.rows[0] ?? null
}

export async function getBudgetIdFromServer(userId: number, year: number, month: number) {
    const response = await fetch(
        `https://memodget-api.milosd21000.workers.dev/database/get-budget-id?user_id=${userId}&year=${year}&month=${month}`
    )

    if (!response.ok) {
        throw new Error('Failed to get budget id')
    }

    return await response.json()
}