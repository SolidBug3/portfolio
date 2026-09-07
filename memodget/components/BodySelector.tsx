import { useEffect } from 'react'

export default function BodySelector() {
    useEffect(() => {
        document.body.classList.add('dashboard-page')

        return () => {
            document.body.classList.remove('dashboard-page')
        }
    }, [])

    return null
}