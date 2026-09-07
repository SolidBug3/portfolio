import './SumUp.css'

export default function SumUp({ credits, debits }: { credits: number, debits: number }) {
    const formated_credits = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(credits);
    const formated_debits = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(debits);

    return (
        <div className="SumUp">
            {formated_credits} - {formated_debits}
        </div>
    )
}