import { useEffect, useState } from 'react'
import type { Client } from '@libsql/client'

export async function getCreditsQuery(db: Client, userId: number, budgetId: number) {
    const result = await db.execute({
        sql: `
            SELECT COALESCE(
                SUM(
                    CASE
                        WHEN credit = 1 THEN value
                        ELSE 0
                    END
                ),
                0
            ) AS total
            FROM amounts
            WHERE user_id = ?
            AND budget_id = ?
        `,
        args: [userId, budgetId]
    })

    return result.rows[0]
}

export async function getCreditsFromServer(userId: number, budgetId: number) {
    const response = await fetch(`https://memodget-api.milosd21000.workers.dev/database/get-credits?user_id=${userId}&budget_id=${budgetId}`)

    if (!response.ok) { throw new Error('Failed to get credits') }

    return await response.json()
}

export function getCredits(userId: number, budgetId: number) {
    const [credits, setCredits] = useState(0)

    useEffect(() => {
        getCreditsFromServer(userId, budgetId).then(result => {
            setCredits(Number(result.total ?? 0))
        })
    }, [userId, budgetId])

    return credits
}