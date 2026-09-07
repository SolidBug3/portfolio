import './privacy.css'

export default function Privacy() {
    return (
        <div className="privacy-page">
            <div className="privacy-card">
                <h1>Memodget — Privacy Policy</h1>

                <p className="privacy-date">
                    Last updated: September 7, 2026
                </p>

                <section>
                    <h2>Data collection</h2>

                    <p>
                        Memodget does not require an account and does not collect
                        personal information through a server.
                    </p>

                    <p>
                        Memodget does not connect to bank accounts, banking services,
                        payment accounts, or financial institutions.
                    </p>
                </section>

                <section>
                    <h2>Data storage</h2>

                    <p>
                        Information entered into Memodget is stored locally on your
                        device in a JSON file.
                    </p>

                    <p>
                        This data is not uploaded to a server or transmitted to
                        SolidBug or any third party.
                    </p>
                </section>

                <section>
                    <h2>Data sharing</h2>

                    <p>
                        Memodget does not sell, rent, or share your personal information
                        with third parties.
                    </p>
                </section>

                <section>
                    <h2>Data deletion</h2>

                    <p>
                        Data stored by Memodget can be removed by uninstalling the
                        application from your device.
                    </p>
                </section>

                <section>
                    <h2>Contact</h2>

                    <p>
                        If you have questions about this privacy policy or Memodget,
                        you can contact SolidBug through the SolidBug website.
                    </p>
                </section>

                <section>
                    <h2>Changes to this policy</h2>

                    <p>
                        This privacy policy may be updated if the functionality or
                        data handling of Memodget changes.
                    </p>
                </section>
            </div>
        </div>
    )
}