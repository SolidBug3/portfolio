import { useEffect, useState } from 'react'

import './css/index.css'
import './css/header.css';
import './css/home_center_image.css';
import './css/speech_bubble.css';
import './css/section.css';
import './css/cards.css';
import './css/cards-projects.css';

function ProjectCard
    ({
        name,
        description,
        icon,
        link,
        images
    }: {
        name: string,
        description: string,
        icon: string,
        link: string,
        images: string[]
    }) {
    const [currentImage, setCurrentImage] = useState(0)
    const [nextImage, setNextImage] = useState(0)
    const [isSliding, setIsSliding] = useState(false)

    useEffect(() => {
        if (images.length <= 1) { return }

        const interval = setInterval(() => {
            setNextImage((currentImage + 1) % images.length)
            setIsSliding(true)

            setTimeout(() => {
                setCurrentImage((currentImage + 1) % images.length)
                setIsSliding(false)
            }, 800)
        }, 2500)

        return () => clearInterval(interval)
    }, [images.length, currentImage])

    return (
        <div className="card-project">

            <div className="card-project-images">
                <img
                    className={`card-project-image ${isSliding ? 'slide-current' : 'current'}`}
                    src={images[currentImage]}
                    alt={`${name} screenshot ${currentImage + 1}`}
                />

                {isSliding && (
                    <img
                        className="card-project-image slide-next"
                        src={images[nextImage]}
                        alt={`${name} screenshot ${nextImage + 1}`}
                    />
                )}
            </div>

            <div className="card-project-info">
                <h3>{name}</h3>
                <p>{description}</p>

                <a
                    className="card-project-link"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={icon} alt="" />
                    <span>Voir sur le Play Store</span>
                </a>
            </div>

        </div>
    )
}

function App() {
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const sections = document.querySelectorAll('section')
        const logo = document.querySelector('.logo')

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (window.innerWidth <= 1650) {
                            logo?.classList.toggle('logo-hidden', entry.target.id !== 'homepage')
                        } else {
                            logo?.classList.remove('logo-hidden')
                        }
                    }
                })
            },
            { threshold: 0.5 }
        )

        sections.forEach(section => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    const projects = [
        {
            name: 'Memodget',
            description: 'Gestion de budget',
            icon: `${import.meta.env.BASE_URL}playstore.png`,
            link: 'https://solidbug3.github.io/portfolio/#projects',
            images: [
                `${import.meta.env.BASE_URL}p1s1.jpg`,
                `${import.meta.env.BASE_URL}p1s2.jpg`,
                `${import.meta.env.BASE_URL}p1s3.jpg`,
                `${import.meta.env.BASE_URL}p1s4.jpg`,
                `${import.meta.env.BASE_URL}p1s5.jpg`
            ]
        }
    ]

    return (
        <>
            <header>
                <div className="header-content">

                    <div className="logo">  <span>SolidBug</span> </div>

                    <nav className={menuOpen ? 'menu-open' : ''}>
                        <a href="#homepage" onClick={() => setMenuOpen(false)}>Accueuil</a>
                        <a href="#skills" onClick={() => setMenuOpen(false)}>Compétences</a>
                        <a href="#projects" onClick={() => setMenuOpen(false)}>Projets</a>
                        <a href="#contact" onClick={() => setMenuOpen(false)}>Travaillons ensemble</a>
                        <a href="#about" onClick={() => setMenuOpen(false)}>A propos</a>
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
                <section id="homepage">
                    <div className="hero-image">
                        <div className="speech-bubble">
                            <span>À Dijon, on ne fait pas que de la moutarde.</span>
                            <span>On développe aussi vos applications..</span>
                        </div>

                        <img src={`${import.meta.env.BASE_URL}me.png`} alt="" />
                    </div>
                </section>

                <section id="skills">
                    <div className="skills">
                        <div className="cards">

                            <div className="card">
                                <div className="card-icon">⚙</div>
                                <h3>Développement fullstack</h3>
                                <p>
                                    (C'est beau et ca marche aussi)
                                </p>
                                <br />
                                <p>
                                    <div className="card-list">
                                        <div><span>⚛</span>Web (React.js)</div>
                                        <div><span>🤖</span>Android (C# / Android)</div>
                                        <div><span>▣</span>Base de donnée (MySQL)</div>
                                    </div>
                                </p>
                            </div>

                            <div className="card">
                                <div className="card-icon">🎨</div>
                                <h3>Design</h3>
                                <p>
                                    Je crée des interfaces modernes et adaptées à votre identité<br />
                                    (Ca brille quoi)
                                </p>
                                <br />
                                <p>
                                    <div className="card-list">
                                        <div><span>Ps</span> UX (Figma, Photoshop)</div>
                                        <div><span>✦</span> Vision artistique</div>
                                        <div><span>☕</span> 2 litres de café</div>
                                    </div>
                                </p>
                            </div>

                            <div className="card">
                                <div className="card-icon">文</div>
                                <h3>Traduction</h3>
                                <p>
                                    J'adapte votre identité a l'internationale.
                                </p>
                                <br />
                                <p>
                                    <div className="card-list">
                                        <div><span>🥖</span> Français</div>
                                        <div><span>🇬🇧</span> Anglais</div>
                                        <div><span>日</span> Japonais</div>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="projects">
                    <div className="cards-projects">
                        {projects.map((project) => (
                            project.images.length > 0 && (
                                <ProjectCard
                                    key={project.name}
                                    name={project.name}
                                    description={project.description}
                                    icon={project.icon}
                                    link={project.link}
                                    images={project.images}
                                />
                            )
                        ))}
                    </div>
                </section>

                <section id="contact">
                    <div className="contact">
                        <center>J'attends vos plus belles idées de projets ici :<br /><br />
                            <i>milosd21000@gmail.com</i><br /><br />
                            <strong>Devis gratuis</strong>, parlons en ensemble !</center>
                    </div>
                </section>

                <section id="about">
                    <div className="about_info">
                        Moi c’est Milo, aka <strong>SolidBug</strong> !<br /><br />
                        Un artiste à qui on a donné un clavier..<br />
                        Et j’ai fini par en faire mon métier (rire)<br />
                        Et puis est née une passion et une <strong>éthique de code</strong>.<br /><br />
                        Un chasseur de « bug », mais pas ceux qui chantent en été.<br /><br />
                        Je matérialise vos projets à coups de clavier, de marteau et d’amour (sûrement)<br />
                        L’image de votre entreprise, votre « brand », comme l’on dirait de nos jours,<br />
                        je la façonne, la bichonne et lui donne forme sous une belle <strong>UI / UX</strong>.<br /><br />
                        L’art a la réputation de ne pas s’entremêler avec l’ombre de la science,<br />
                        eh bien c’est ici que vous les trouverez au rendez-vous,<br />
                        comme vous et moi, si je puis avoir l’honneur de travailler sur votre projet.<br /><br />
                        Au plaisir de vous voir pour de nouvelles aventures codesques et graphiques !<br /><br />
                        <strong>PS</strong> : Comme vous l’aurez compris de par ma plume, les langues et l’écriture sont d’autres cordes à mon arc.<br />
                        Je peux traduire vos applications en <strong>anglais</strong> et <strong>japonais</strong>.
                    </div>
                </section>
            </main>
        </>
    )
}

export default App