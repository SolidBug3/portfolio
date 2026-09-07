import { useEffect, useState } from 'react'

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

function Portfolio() {
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const sections = document.querySelectorAll('section')
        const logo = document.querySelector('.logo')
        const contactImage = document.querySelector('.contact-image-circle')

        const updateLogo = () => {
            if (!logo) { return }

            let closestSectionId = ''
            let closestDistance = Infinity

            sections.forEach(section => {
                const rect = section.getBoundingClientRect()
                const sectionCenter = rect.top + rect.height / 2
                const distance = Math.abs(sectionCenter - window.innerHeight / 2)

                if (distance < closestDistance) {
                    closestDistance = distance
                    closestSectionId = section.id
                }
            })

            const isMobile = window.innerWidth <= 1200
            const isHomepage = closestSectionId === 'homepage'

            logo.classList.toggle(
                'logo-hidden',
                isMobile || !isHomepage
            )

            if (contactImage) {
                contactImage.classList.toggle(
                    'contact-image-hidden',
                    window.innerWidth <= 900 || isHomepage
                )
            }
        }

        updateLogo()

        window.addEventListener('scroll', updateLogo)
        window.addEventListener('resize', updateLogo)

        return () => {
            window.removeEventListener('scroll', updateLogo)
            window.removeEventListener('resize', updateLogo)
        }
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
                `${import.meta.env.BASE_URL}p1s5.jpg`
            ]
        }
    ]

    return (
        <>
            <header>
                <div className="header-content">

                    <div className="logo">
                        <span>SolidBug</span>
                    </div>

                    <nav className={menuOpen ? 'menu-open' : ''}>
                        <a href="#homepage" onClick={() => setMenuOpen(false)}>Accueil</a>
                        <a href="#about" onClick={() => setMenuOpen(false)}>À propos</a>
                        <a href="#projects" onClick={() => setMenuOpen(false)}>Projets</a>
                        <a href="#contact" onClick={() => setMenuOpen(false)}>Travaillons ensemble</a>
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
                                    (Ca brille)
                                </p>
                                <br />
                                <p>
                                    <div className="card-list">
                                        <div><span>Ps</span> UI (Figma, Photoshop)</div>
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

                <section id="about">
                    <div className="about-content">

                        <div className="about-picture">

                            <div className="speech-bubble">
                                <span>À Dijon, on ne fait pas que de la moutarde.</span>
                                <span>On développe aussi vos applications..</span>
                            </div>

                            <div className="about-hexagon">
                                <div className="about-droplet about-droplet-1"></div>
                                <div className="about-droplet about-droplet-2"></div>
                                <div className="about-droplet about-droplet-3"></div>

                                <img
                                    src="rme.png"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="about_info">

                            Moi c’est Milo, aka <strong>SolidBug</strong> !<br /><br />
                            Un artiste à qui on a donné un clavier..<br />
                            Et j’ai fini par en faire mon métier (rire)<br />
                            Et puis est née une passion et une <strong>éthique de code</strong>.<br /><br />
                            Un chasseur de « bug », mais pas ceux qui chantent en été.<br />
                            Celui qui faconne l'image des projets et leur donne vie.<br />Ou plutot UI (...)<br /><br />
                            Au plaisir de vous voir pour des aventures codesques et graphiques !<br /><br />

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
                        <div className="contact-content">
                            <div className="speech-bubble2">
                                J'attends vos plus belles idées de projets ici:<br /><br />
                                <i>milosd21000@gmail.com</i><br /><br />
                                <strong>Devis gratuis</strong>, parlons en ensemble !
                            </div>

                        </div>
                    </div>
                </section>

            </main>
        </>
    )
}

export default Portfolio