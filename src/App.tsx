import { useEffect, useState } from 'react'
import Memodget from '../memodget/Memodget'
import Portfolio from './Portfolio'

function PortfolioPage() {
    const [cssLoaded, setCssLoaded] = useState(false)

    useEffect(() => {
        Promise.all([
            import('./css/main.css'),
            import('./css/header.css'),
            import('./css/home_center_image.css'),
            import('./css/speech_bubble2.css'),
            import('./css/section.css'),
            import('./css/cards.css'),
            import('./css/cards-projects.css'),
            import('./css/about.css'),
            import('./css/contact.css')
        ]).then(() => {
            setCssLoaded(true)
        })
    }, [])

    if (!cssLoaded) {
        return null
    }

    return <Portfolio />
}

function App() {
    const path = window.location.pathname

    if (path === '/memodget' || path === '/memodget/') {
        return <Memodget />
    }

    return <PortfolioPage />
}

export default App