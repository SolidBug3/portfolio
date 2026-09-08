import type { Client } from '@libsql/client'

export async function getLastBudgetIdQuery(db: Client, params: Record<string, string>) {
    const userId = Number(params.user_id)

    const result = await db.execute({
        sql: `
            SELECT id
            FROM budgets
            WHERE user_id = ?
            ORDER BY id DESC
            LIMIT 1
        `,
        args: [userId]
    })

    return result.rows[0] ?? null
}

export async function getLastBudgetIdFromServer(userId: number) {
    const response = await fetch(
        `https://memodget-api.milosd21000.workers.dev/database/get-last-budget-id?user_id=${userId}`
    )

    if (!response.ok) {
        throw new Error('Failed to get last budget id')
    }

    return await response.json()
}