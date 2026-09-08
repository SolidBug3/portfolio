import './privacy.css'

export default function Privacy() {
    return (
        <div className="privacy-page">
            <div className="privacy-card">
                <h1>Memodget — Politique de confidentialité</h1>

                <p className="privacy-date">
                    Dernière mise à jour : 7 septembre 2026
                </p>

                <section>
                    <h2>Collecte des données</h2>

                    <p>
                        Memodget nécessite un compte pour utiliser ses fonctionnalités
                        en ligne. Lorsque vous créez un compte ou vous connectez,
                        Memodget peut recevoir et stocker des informations telles que
                        votre adresse e-mail, votre nom et votre identifiant de compte.
                    </p>

                    <p>
                        Memodget ne se connecte pas aux comptes bancaires, aux services
                        bancaires, aux comptes de paiement ou aux établissements
                        financiers.
                    </p>
                </section>

                <section>
                    <h2>Données de budget et de dépenses</h2>

                    <p>
                        Les informations que vous saisissez dans Memodget, telles que
                        vos dépenses, revenus, catégories et informations budgétaires,
                        peuvent être stockées sur nos serveurs afin d'être accessibles
                        depuis votre compte.
                    </p>

                    <p>
                        Ces informations sont utilisées uniquement pour fournir les
                        fonctionnalités de Memodget.
                    </p>
                </section>

                <section>
                    <h2>Paiements</h2>

                    <p>
                        Memodget peut proposer certaines fonctionnalités ou certains
                        accès par le biais d'un paiement unique.
                    </p>

                    <p>
                        Les informations de paiement sont traitées par notre prestataire
                        de paiement. Memodget ne stocke pas l'intégralité des informations
                        de votre carte bancaire.
                    </p>
                </section>

                <section>
                    <h2>Partage des données</h2>

                    <p>
                        Memodget ne vend ni ne loue vos informations personnelles.
                    </p>

                    <p>
                        Vos informations peuvent être partagées avec des prestataires
                        tiers uniquement lorsque cela est nécessaire pour fournir les
                        services de Memodget, notamment pour l'authentification, le
                        stockage des données ou le traitement des paiements.
                    </p>
                </section>

                <section>
                    <h2>Sécurité des données</h2>

                    <p>
                        Nous prenons des mesures raisonnables pour protéger votre compte
                        et les informations stockées par Memodget contre tout accès,
                        toute modification ou toute divulgation non autorisée.
                    </p>
                </section>

                <section>
                    <h2>Suppression des données</h2>

                    <p>
                        Vous pouvez demander la suppression de votre compte Memodget
                        et des données associées en nous contactant.
                    </p>
                </section>

                <section>
                    <h2>Contact</h2>

                    <p>
                        Si vous avez des questions concernant cette politique de
                        confidentialité ou Memodget, vous pouvez contacter SolidBug
                        via le site internet de SolidBug.
                    </p>
                </section>

                <section>
                    <h2>Modifications de cette politique</h2>

                    <p>
                        Cette politique de confidentialité peut être mise à jour si
                        les fonctionnalités ou le traitement des données de Memodget
                        évoluent.
                    </p>
                </section>

                <a
                    className="privacy-back-button"
                    href="https://solidbug.fr/memodget"
                >
                    Retour à Memodget
                </a>
            </div>
        </div>
    )
}