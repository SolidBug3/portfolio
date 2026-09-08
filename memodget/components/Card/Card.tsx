import '../Card/Card.css'
import '../Card/Card-Hover.css'
import '../Card/Card-Gloss.css'

export { default as Deck } from './Deck'
export { default as CardSpan } from './CardSpan'

import type { ReactNode } from 'react'

export default function Card({ children, container, CD = true, orientation = 'v', className }: { children: ReactNode, container?: string, CD?: boolean, orientation?: 'h' | 'v', className?: string }) {
    const card = <div className={className ? `card ${className}-card` : 'card'}>{children}</div>

    if (CD) {
        return card
    }

    return (
        <div className={container ? `card-container-${container}` : `card-container-${orientation}`}>
            {card}
        </div>
    )
}