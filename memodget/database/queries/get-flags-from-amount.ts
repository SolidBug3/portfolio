import type { Client } from '@libsql/client'

export async function getFlagsFromAmountQuery(db: Client, params: Record<string, string>) {
    const userId = Number(params.user_id)
    const amountId = Number(params.amount_id)

    const result = await db.execute({
        sql: `
            SELECT flags.id, flags.label, flags.color
            FROM flags
            JOIN json_each(
                (
                    SELECT flag_indexes
                    FROM amounts
                    WHERE id = ?
                    AND user_id = ?
                )
            )
            ON flags.id = json_each.value
        `,
        args: [amountId, userId]
    })

    return result.rows
}

export async function getFlagsFromAmountFromServer(userId: number, amountId: number) {
    const response = await fetch(
        `https://memodget-api.milosd21000.workers.dev/database/get-flags-from-amount?user_id=${userId}&amount_id=${amountId}`
    )

    if (!response.ok) {
        throw new Error('Failed to get flags from amount')
    }

    return await response.json()
}