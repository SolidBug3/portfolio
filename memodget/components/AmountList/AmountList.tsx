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

type Flag = {
    id: number
    label: string
    color: string
}

export default function AmountList({ data, flags }: { data: Amount[], flags: Record<number, Flag[]> }) {
    return (
        <div className="AmountList">
            {data.map((amount) => (
                <div className="amount-list-element" key={amount.id}>
                    <span>{amount.day}</span>

                    <span className={amount.credit ? 'amount-positive' : 'amount-negative'}>
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount.credit ? amount.value : -amount.value)}
                    </span>

                    <span>{amount.permanent ? 'Récurrent' : '-'}</span>

                    <span className="amount-flags">
                        {flags[amount.id]?.length
                            ? flags[amount.id].map((flag) => (
                                <span className="amount-flag" key={flag.id}>{flag.label}</span>
                            ))
                            : '-'}
                    </span>
                </div>
            ))}
        </div>
    )
}