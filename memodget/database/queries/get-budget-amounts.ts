import { useEffect, useState } from 'react'
import type { Client } from '@libsql/client'

export async function getBudgetAmountsQuery(db: Client, params: Record<string, string>) {
    const userId = Number(params.user_id)
    const budgetId = Number(params.budget_id)
    const flags = params.flags ? JSON.parse(params.flags) as string[] : []

    let sql = `
        SELECT *
        FROM amounts
        WHERE user_id = ?
        AND budget_id = ?
    `

    const args: (number | string)[] = [userId, budgetId]

    for (const flag of flags) {
        sql += `
            AND EXISTS (
                SELECT 1
                FROM flags
                JOIN json_each(amounts.flag_indexes)
                ON flags.id = CAST(json_each.value AS INTEGER)
                WHERE LOWER(flags.label) LIKE '%' || LOWER(?) || '%'
            )
        `

        args.push(flag)
    }

    sql += `
        ORDER BY day DESC
    `

    const result = await db.execute({
        sql,
        args
    })

    return result.rows
}

export async function getBudgetAmountsFromServer(userId: number, budgetId: number, flags: string[] = []) {
    const response = await fetch(
        `https://memodget-api.milosd21000.workers.dev/database/get-budget-amounts?user_id=${userId}&budget_id=${budgetId}&flags=${encodeURIComponent(JSON.stringify(flags))}`
    )

    if (!response.ok) {
        throw new Error('Failed to get budget amounts')
    }

    return await response.json()
}

export function getBudgetAmounts(userId: number, budgetId: number, flags: string[] = []) {
    const [amounts, setAmounts] = useState<any[]>([])

    useEffect(() => {
        const update = async () => {
            try {
                const result = await getBudgetAmountsFromServer(userId, budgetId, flags)
                setAmounts(Array.isArray(result) ? result : [])
            } catch (error) {
                console.error('Failed to get budget amounts:', error)
                setAmounts([])
            }
        }

        update()

        const interval = setInterval(update, 5000)

        return () => clearInterval(interval)
    }, [userId, budgetId, flags.join(',')])

    return amounts
}