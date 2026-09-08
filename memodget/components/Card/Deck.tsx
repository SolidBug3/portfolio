import '../Card/Deck.css'

import type { ReactNode } from 'react'

export default function Deck({ children, container, orientation = 'v', is }: { children: ReactNode, container?: string, orientation?: 'h' | 'v', is?: string }) {
    return (
        <div className={`${container ? `card-container-${container}` : `card-container-${orientation}`}${is ? `-${is}` : ''}`}>
            {children}
        </div>
    )
}