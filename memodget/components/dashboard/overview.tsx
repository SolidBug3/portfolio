import '../../css/cards/cards.css'
import '../../css/cards/card-list.css'
import '../../css/cards/card-icon.css'
import '../../css/cards/card-title.css'
import '../../css/dashboard/custom-cards.css'

import CircleProgress from "../CircleProgress/CircleProgress"

import { getCredits } from "../../database/queries/get-credits"
import { getDebits } from "../../database/queries/get-debits"

export default function OverView({ user }: { user: { id: number, email: string, name: string | null } }) {
    const selected_budget = 1

    const credits = getCredits(user.id, selected_budget)
    const debits = getDebits(user.id, selected_budget)

    const balance = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(credits - debits)

    return (
        <div className="card-container">
            <div className="custom-card">
                <div className="custom-card-list">
                    <CircleProgress total={credits} red={debits} />
                    <div><span>⚖️</span>{balance}</div>
                </div>
            </div>
        </div>
    )
}