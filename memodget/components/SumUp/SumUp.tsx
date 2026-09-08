import './SumUp.css'

export default function SumUp({ credits, debits }: { credits: number, debits: number }) {
    const formated_credits = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
        debits >= 0 ? credits - debits : credits
    )

    const formated_debits = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Math.abs(debits))

    return (
        <div className="SumUp">
            {debits >= 0
                ? `${formated_credits} + ${formated_debits}`
                : `${formated_credits} - ${formated_debits}`}
        </div>
    )
}