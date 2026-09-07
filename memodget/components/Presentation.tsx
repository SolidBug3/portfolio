import '../css/cards/cards.css'
import '../css/cards/card-list.css'
import '../css/cards/card-icon.css'
import '../css/cards/card-title.css'

export default function Presentation() {
    return (
        <div className="card-container">
            <div className="card">
                <div className="card-icon">📱</div>
                <span className="title">Disponible partout</span>

                <div className="card-list">
                    <div><span>✦</span>mobile / tablettes</div>
                    <div><span>💻</span>PC</div>
                </div>
            </div>

            <div className="card">
                <div className="card-icon">👛</div>
                <span className="title">Votre gestion budgetaire</span>

                <div className="card-list">
                    <div><span>✦</span>Au mois et a l'année</div>
                    <div><span>💸</span>Des dépenses contrôlées</div>
                </div>
            </div>

            <div className="card">
                <div className="card-icon">📒</div>
                <span className="title">Simplifiée</span>

                <div className="card-list">
                    <div><span>✦</span>Rapide d'utilisation</div>
                    <div><span>✅</span>Catégories libres</div>
                </div>
            </div>
        </div>
    )
}