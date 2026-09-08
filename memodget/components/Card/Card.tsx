import '../Card/Card.css'
import '../Card/Card-Hover.css'
import '../Card/Card-Gloss.css'

export { default as Deck } from './Deck'
export { default as CardSpan } from './CardSpan'

import type { ReactNode } from 'react'

export default function Card({ children, container, CD = true, orientation = 'v', className, is }: { children: ReactNode, container?: string, CD?: boolean, orientation?: 'h' | 'v', className?: string, is?: string }) {
    const card = <div className={`card${className ? ` ${className}-card` : ''}${is ? ` ${is}-card` : ''}`}>{children}</div>

    if (CD) {
        return card
    }

    return (
        <div className={container ? `card-container-${container}` : `card-container-${orientation}`}>
            {card}
        </div>
    )
}