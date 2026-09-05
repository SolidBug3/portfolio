import './css/index.css'
import './css/header.css';
import './css/home_center_image.css';
import './css/speech_bubble.css';

function App() {
    return (
        <>
            <header>
                <div className="header-content">

                    <div className="logo">  <span>SolidBug</span> </div>

                    <nav>
                        <a href="#home">Accueuil</a>
                        <a href="#about">A propos</a>
                        <a href="#projects">Example de projets</a>
                        <a href="#contact">Me contacter</a>
                    </nav>
                </div>
            </header>


            <main id="home">
                <div className="hero-image">
                    <div className="speech-bubble">
                        <span>À Dijon, on ne fait pas que de la moutarde.</span>
                        <span>On développe aussi vos applications..</span>
                    </div>

                    <img src="/me.png" alt="" />
                </div>
            </main>
        </>
    )
}

export default App