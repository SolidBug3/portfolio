import { useEffect } from 'react'
import Memodget from '../memodget/Memodget'
import Portfolio from './Portfolio'

const portfolioCss = [
    '/src/css/main.css',
    '/src/css/header.css',
    '/src/css/home_center_image.css',
    '/src/css/speech_bubble2.css',
    '/src/css/section.css',
    '/src/css/cards.css',
    '/src/css/cards-projects.css',
    '/src/css/about.css',
    '/src/css/contact.css'
]

function loadPortfolioCss() {
    portfolioCss.forEach(href => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        link.dataset.portfolioCss = 'true'
        document.head.appendChild(link)
    })
}

function removePortfolioCss() {
    document
        .querySelectorAll('link[data-portfolio-css="true"]')
        .forEach(link => link.remove())
}

function App() {
    const path = window.location.pathname
    const isMemodget = path === '/memodget' || path === '/memodget/'

    useEffect(() => {
        if (!isMemodget) {
            loadPortfolioCss()
        }

        return () => {
            removePortfolioCss()
        }
    }, [isMemodget])

    if (isMemodget) {
        return <Memodget />
    }

    return <Portfolio />
}

export default App