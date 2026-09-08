import CircleProgress from "../CircleProgress/CircleProgress"
import SumUp from "../SumUp/SumUp"
import BudgetSelector from "../BudgetSelector/BudgetSelector"
import AmountList from "../AmountList/AmountList"
import BudgetData from "../BudgetData"
import Card, { Deck } from "../Card/Card"

import "../../css/dashboard/balance-card.css"

export default function OverView({ user }: { user: { id: number, email: string, name: string | null } }) {
    const { selectedBudget, credits, debits, amounts, flags, balance, handleBudgetChange } = BudgetData(user.id)

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
            <Deck is="loose">
                <Card is="loose"><AmountList data={amounts} flags={flags} /></Card>
            </Deck>
        </>
    )
}