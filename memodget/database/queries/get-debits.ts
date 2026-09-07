import { useEffect, useState } from 'react'
import type { Client } from '@libsql/client'

export async function getDebitsQuery(db: Client, userId: number, budgetId: number) {
    const result = await db.execute({
        sql: `
            SELECT COALESCE(
                SUM(
                    CASE
                        WHEN credit = 0 THEN value
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

export async function getDebitsFromServer(userId: number, budgetId: number) {
    const response = await fetch(`https://memodget-api.milosd21000.workers.dev/database/get-debits?user_id=${userId}&budget_id=${budgetId}`)

    if (!response.ok) { throw new Error('Failed to get debits') }

    return await response.json()
}

export function getDebits(userId: number, budgetId: number) {
    const [debits, setDebits] = useState(0)

    useEffect(() => {
        getDebitsFromServer(userId, budgetId).then(result => {
            setDebits(Number(result.total ?? 0))
        })
    }, [userId, budgetId])

    return debits
}