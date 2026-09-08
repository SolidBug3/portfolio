import { useState } from "react"

import CircleProgress from "../CircleProgress/CircleProgress"
import SumUp from "../SumUp/SumUp"
import BudgetSelector from "../BudgetSelector/BudgetSelector"
import AmountList from "../AmountList/AmountList"
import SearchBar from "../SearchBar/SearchBar"
import BudgetData from "../BudgetData"
import Card, { Deck } from "../Card/Card"

import "../../css/dashboard/balance-card.css"

export default function OverView({ user }: { user: { id: number, email: string, name: string | null } }) {
    const [searchFlags, setSearchFlags] = useState<string[]>([])
    const { selectedBudget, credits, amounts, flags, balance, handleBudgetChange } = BudgetData(user.id, searchFlags)

    const debit = amounts.reduce((total, amount) => { return amount.credit ? total : total + Number(amount.value) }, 0)

    return (
        <>
            <Deck>
                <Card><BudgetSelector onChange={handleBudgetChange} /></Card>

                {selectedBudget !== null && (
                    <>
                        <Card className="balance">⚖️{balance}</Card>

                        <Card>
                            <CircleProgress credits={credits} debits={debit} />
                            <SumUp credits={credits} debits={debit} />
                        </Card>

                        <Card><SearchBar onSearch={setSearchFlags} /></Card>
                    </>
                )}
            </Deck>
            <Deck is="loose">
                <Card is="loose"><AmountList data={amounts} flags={flags} /></Card>
            </Deck>
        </>
    )
}