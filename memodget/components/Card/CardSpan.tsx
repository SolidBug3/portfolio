import '../Card/Card-Span.css'

import type { ReactNode } from 'react'

export default function CardSpan({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <span className={className ? `card-span ${className}-card-span` : 'card-span'}>
            {children}
        </span>
    )
}