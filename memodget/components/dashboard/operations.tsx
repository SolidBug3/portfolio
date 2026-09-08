import BudgetData from "../BudgetData"
import Card, { Deck } from "../Card/Card"

export default function Operations({ user }: { user: { id: number, email: string, name: string | null } }) {
    const { selectedBudget, credits, debits, amounts, flags, balance, handleBudgetChange } = BudgetData(user.id)

    return (
        <>
            <Deck>
                <Card>versement</Card>
                <Card>prélèvement</Card>
            </Deck>
        </>
    )
}