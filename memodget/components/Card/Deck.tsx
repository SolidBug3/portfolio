import '../Card/Deck.css'

import type { ReactNode } from 'react'

export default function Deck({ children, container, orientation = 'v' }: { children: ReactNode, container?: string, orientation?: 'h' | 'v' }) {
    return (
        <div className={container ? `card-container-${container}` : `card-container-${orientation}`}>
            {children}
        </div>
    )
}