import { useEffect, useState } from 'react'
import type { Client } from '@libsql/client'

export async function getBudgetAmountsQuery(db: Client, params: Record<string, string>) {
    const userId = Number(params.user_id)
    const budgetId = Number(params.budget_id)

    const result = await db.execute({
        sql: `
            SELECT *
            FROM amounts
            WHERE user_id = ?
            AND budget_id = ?
            ORDER BY id DESC
        `,
        args: [userId, budgetId]
    })

    return result.rows
}

export async function getBudgetAmountsFromServer(userId: number, budgetId: number) {
    const response = await fetch(
        `https://memodget-api.milosd21000.workers.dev/database/get-budget-amounts?user_id=${userId}&budget_id=${budgetId}`
    )

    if (!response.ok) {
        throw new Error('Failed to get budget amounts')
    }

    return await response.json()
}

export function getBudgetAmounts(userId: number, budgetId: number) {
    const [amounts, setAmounts] = useState<any[]>([])

    useEffect(() => {
        const update = async () => {
            try {
                const result = await getBudgetAmountsFromServer(userId, budgetId)
                setAmounts(Array.isArray(result) ? result : [])
            } catch (error) {
                console.error('Failed to get budget amounts:', error)
                setAmounts([])
            }
        }

        update()

        const interval = setInterval(update, 5000)

        return () => clearInterval(interval)
    }, [userId, budgetId])

    return amounts
}