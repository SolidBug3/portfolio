import '../../css/cards/cards.css'
import '../../css/cards/card-list.css'
import '../../css/cards/card-icon.css'
import '../../css/cards/card-title.css'
import '../../css/dashboard/custom-cards.css'

import CircleProgress from "../CircleProgress/CircleProgress"
import SumUp from "../SumUp/SumUp"

import { getCredits } from "../../database/queries/get-credits"
import { getDebits } from "../../database/queries/get-debits"
import { getBudgetInfo } from "../../database/queries/get-budget-info"

export default function OverView({ user }: { user: { id: number, email: string, name: string | null } }) {
    const selected_budget = 1

    const credits = getCredits(user.id, selected_budget)
    const debits = getDebits(user.id, selected_budget)

    const balance = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(credits - debits)

    const budgetInfo = getBudgetInfo(selected_budget)

    if (!budgetInfo) { return null }

    const year = budgetInfo.year
    const month = budgetInfo.month

    const date = `${year}/${String(month).padStart(2, '0')}`

    return (
        <div className="card-container">
            <div className="custom-card">
                <div className="custom-card-list"><span>{date}</span></div>
            </div>

            <div className="custom-card">
                <div className="custom-card-list">
                    <div className="card-low-content"><span>⚖️</span>{balance}</div>
                </div>
            </div>

            <div className="custom-card">
                <div className="custom-card-list">
                    <CircleProgress credits={credits} debits={debits} />
                    <div><SumUp credits={credits} debits={debits} /></div>
                </div>
            </div>
        </div>
    )
}