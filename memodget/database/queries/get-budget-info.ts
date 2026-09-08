import { useEffect, useState } from 'react'
import type { Client } from '@libsql/client'

export async function getBudgetInfoQuery(db: Client, params: Record<string, string>) {
    const budgetId = Number(params.budget_id)

    const result = await db.execute({
        sql: `
            SELECT year, month
            FROM budgets
            WHERE id = ?
        `,
        args: [budgetId]
    })

    return result.rows[0]
}

export async function getBudgetInfoFromServer(budgetId: number) {
    const response = await fetch(`https://memodget-api.milosd21000.workers.dev/database/get-budget-info?budget_id=${budgetId}`)

    if (!response.ok) { throw new Error('Failed to get budget info') }

    return await response.json()
}

export function getBudgetInfo(budgetId: number) {
    const [budgetInfo, setBudgetInfo] = useState<{
        year: number
        month: number
    } | null>(null)

    useEffect(() => {
        const update = () => {
            getBudgetInfoFromServer(budgetId).then(result => {
                setBudgetInfo({
                    year: Number(result.year),
                    month: Number(result.month)
                })
            })
        }

        update()

        const interval = setInterval(update, 5000)

        return () => clearInterval(interval)
    }, [budgetId])

    return budgetInfo
}