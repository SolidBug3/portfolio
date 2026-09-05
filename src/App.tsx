import { useState } from 'react'

import './css/index.css'
import './css/header.css';
import './css/home_center_image.css';
import './css/speech_bubble.css';

function App() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <header>
                <div className="header-content">

                    <div className="logo">  <span>SolidBug</span> </div>


                    <nav className={menuOpen ? 'menu-open' : ''}>
                        <a href="#home" onClick={() => setMenuOpen(false)}>Accueuil</a>
                        <a href="#about" onClick={() => setMenuOpen(false)}>A propos</a>
                        <a href="#projects" onClick={() => setMenuOpen(false)}>Example de projets</a>
                        <a href="#contact" onClick={() => setMenuOpen(false)}>Me contacter</a>
                    </nav>

                    <button
                        className="menu-button"
                        aria-label="Ouvrir le menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </header>


            <main id="home">
                <div className="hero-image">
                    <div className="speech-bubble">
                        <span>À Dijon, on ne fait pas que de la moutarde.</span>
                        <span>On développe aussi vos applications..</span>
                    </div>

                    <img src={`${import.meta.env.BASE_URL}me.png`} alt="" />
                </div>
            </main>
        </>
    )
}

export default App