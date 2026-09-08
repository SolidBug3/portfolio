import { useEffect, useRef, useState } from "react"

import CircleProgress from "../CircleProgress/CircleProgress"
import SumUp from "../SumUp/SumUp"
import BudgetSelector from "../BudgetSelector/BudgetSelector"

import { getCredits } from "../../database/queries/get-credits"
import { getDebits } from "../../database/queries/get-debits"
import { getBudgetIdFromServer } from "../../database/queries/get-budget-id"
import { getLastBudgetIdFromServer } from "../../database/queries/get-last-budget-id"

import Card, { Deck, CardSpan } from "../card/Card"

import "../../css/dashboard/balance-card.css"

export default function OverView({ user }: { user: { id: number, email: string, name: string | null } }) {
    const [selectedBudget, setSelectedBudget] = useState<number | null>(null)
    const [year, setYear] = useState(2026)
    const [month, setMonth] = useState(9)

    const requestId = useRef(0)

    const credits = getCredits(user.id, selectedBudget ?? 0)
    const debits = getDebits(user.id, selectedBudget ?? 0)

    const balance = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR'
    }).format(credits - debits)

    useEffect(() => {
        const loadLastBudget = async () => {
            try {
                const result = await getLastBudgetIdFromServer(user.id)

                if (result?.id) {
                    setSelectedBudget(Number(result.id))
                }
            } catch (error) {
                console.error('Failed to get last budget:', error)
            }
        }

        loadLastBudget()
    }, [user.id])

    const handleBudgetChange = async (newYear: number, newMonth: number) => {
        const currentRequest = ++requestId.current

        setYear(newYear)
        setMonth(newMonth)
        setSelectedBudget(null)

        try {
            const result = await getBudgetIdFromServer(user.id, newYear, newMonth)
            console.log('BUDGET LOOKUP:', user.id, newYear, newMonth, result)

            if (currentRequest !== requestId.current) { return }

            if (result?.id) { setSelectedBudget(Number(result.id)) }
        } catch (error) {
            if (currentRequest === requestId.current) {
                console.error('Failed to get budget:', error)
            }
        }
    }

    return (
        <>
            <Deck>
                <Card><BudgetSelector onChange={handleBudgetChange} /></Card>

                {selectedBudget !== null && (
                    <>
                        <Card className="balance">⚖️{balance}</Card>

                        <Card>
                            <CircleProgress credits={credits} debits={debits} />
                            <SumUp credits={credits} debits={debits} />
                        </Card>
                    </>
                )}
            </Deck>
        </>
    )
}