import { useEffect, useRef, useState } from "react"

import { getCredits } from "../database/queries/get-credits"
import { getDebits } from "../database/queries/get-debits"
import { getBudgetIdFromServer } from "../database/queries/get-budget-id"
import { getBudgetAmounts } from "../database/queries/get-budget-amounts"
import { getFlagsFromAmountFromServer } from "../database/queries/get-flags-from-amount"

let sessionBudgetId: number | null = null

export default function BudgetData(userId: number, searchFlags: string[] = []) {
    const [selectedBudget, setSelectedBudget] = useState<number>(() => {
        if (sessionBudgetId === null) {
            sessionBudgetId = 1
        }

        return sessionBudgetId
    })

    const [flags, setFlags] = useState<Record<number, any[]>>({})

    const requestId = useRef(0)

    const amounts = getBudgetAmounts(userId, selectedBudget, searchFlags)
    const credits = getCredits(userId, selectedBudget)
    const debits = getDebits(userId, selectedBudget)

    const balance = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(credits - debits)

    useEffect(() => {
        const loadFlags = async () => {
            const result: Record<number, any[]> = {}

            for (const amount of amounts) {
                result[amount.id] = await getFlagsFromAmountFromServer(userId, amount.id)
            }

            setFlags(result)
        }

        if (amounts.length > 0) {
            loadFlags()
        } else {
            setFlags({})
        }
    }, [userId, amounts])

    const handleBudgetChange = async (newYear: number, newMonth: number) => {
        const currentRequest = ++requestId.current

        sessionBudgetId = 0
        setSelectedBudget(0)

        try {
            const result = await getBudgetIdFromServer(userId, newYear, newMonth)

            if (currentRequest !== requestId.current) { return }

            if (result?.id) {
                const budgetId = Number(result.id)

                sessionBudgetId = budgetId
                setSelectedBudget(budgetId)
            }
        } catch (error) {
            if (currentRequest === requestId.current) {
                console.error('Failed to get budget:', error)
            }
        }
    }

    return {
        selectedBudget,
        credits,
        debits,
        amounts,
        flags,
        balance,
        handleBudgetChange
    }
}