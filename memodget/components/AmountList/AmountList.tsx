import './AmountList.css'

type Amount = {
    id: number
    user_id: number
    budget_id: number
    value: number
    credit: number
    permanent: number
    day: number
    flag_indexes: string | null
}

export default function AmountList({ data }: { data: Amount[] }) {
    return (
        <div className="AmountList">
            {data.map((amount) => (
                <div className="amount-list-element" key={amount.id}>
                    <span>{amount.day}</span>
                    <span className={amount.credit ? 'amount-positive' : 'amount-negative'}>
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount.credit ? amount.value : -amount.value)}
                    </span>
                    <span>{amount.permanent ? 'Récurrent' : '-'}</span>
                    <span>{amount.flag_indexes}</span>
                </div>
            ))}
        </div>
    )
}