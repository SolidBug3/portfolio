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
                    <div><span>✦</span>utilisable partout</div>
                    <div><span>💻</span>PC</div>
                    <div><span>📱</span>tablette / mobile (bientôt)</div>
                </div>
            </div>

            <div className="card">
                <div className="card-icon">👛</div>
                <span className="title">Votre gestion budgetaire</span>

                <div className="card-list">
                    <div><span>✦</span>Au mois et a l'année</div>
                    <div><span>💸</span>Des dépenses contrôlées</div>
                    <div className="card-list-element-special"><span>🪙</span>12€ une fois = accès à vie.</div>
                </div>
            </div>

            <div className="card">
                <div className="card-icon">📒</div>
                <span className="title">Simplifiée</span>

                <div className="card-list">
                    <div><span>✦</span>Pas de connexion bancaire</div>
                    <div><span>✅</span>Catégories libres</div>
                    <div><span>✅</span>Résumé facile à lire</div>
                </div>
            </div>
        </div>
    )
}