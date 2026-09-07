import { useEffect, useState } from 'react'

import Home from './pages/Home'

declare global {
    interface Window {
        google: any
    }
}

interface User {
    id: number
    email: string
    name: string | null
}

export default function Memodget() {
    const [user, setUser] = useState<User | null>(null)
    const [checkingSession, setCheckingSession] = useState(true)

    useEffect(() => {
        const checkSession = async () => {
            const sessionToken = localStorage.getItem('memodget_session')

            if (!sessionToken) {
                setCheckingSession(false)
                return
            }

            try {
                const result = await fetch(
                    'https://memodget-api.milosd21000.workers.dev/auth/me',
                    {
                        headers: {
                            Authorization: `Bearer ${sessionToken}`
                        }
                    }
                )

                const data = await result.json()

                if (data.authenticated) {
                    setUser(data.user)
                } else {
                    localStorage.removeItem('memodget_session')
                }
            } catch (error) {
                console.error(
                    'Session check failed:',
                    error
                )
            }

            setCheckingSession(false)
        }

        checkSession()
    }, [])

    useEffect(() => {
        let cancelled = false

        const initializeGoogle = () => {
            if (cancelled) {
                return
            }

            if (!window.google) {
                setTimeout(initializeGoogle, 100)

                return
            }

            if (window.google.accounts.id.__memodget_initialized) {
                return
            }

            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

                callback: async (response: any) => {
                    try {
                        const result = await fetch(
                            'https://memodget-api.milosd21000.workers.dev/auth/google',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    credential: response.credential
                                })
                            }
                        )

                        const data = await result.json()

                        console.log(
                            'Worker response:',
                            data
                        )

                        if (
                            data.authenticated &&
                            data.session_token
                        ) {
                            localStorage.setItem(
                                'memodget_session',
                                data.session_token
                            )

                            setUser(data.user)

                            console.log(
                                'Logged in as user:',
                                data.user.id
                            )
                        }
                    } catch (error) {
                        console.error(
                            'Worker request failed:',
                            error
                        )
                    }
                }
            })

            window.google.accounts.id.__memodget_initialized = true
        }

        initializeGoogle()

        return () => {
            cancelled = true
        }
    }, [])

    const handleGoogleLogin = () => {
        if (!window.google) {
            console.error(
                'Google Identity Services is not loaded'
            )

            return
        }

        window.google.accounts.id.prompt()
    }

    const handleLogout = async () => {
        const sessionToken = localStorage.getItem(
            'memodget_session'
        )

        if (!sessionToken) {
            setUser(null)

            return
        }

        try {
            const result = await fetch(
                'https://memodget-api.milosd21000.workers.dev/auth/logout',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        session_token: sessionToken
                    })
                }
            )

            const data = await result.json()

            console.log(
                'Logout response:',
                data
            )

            localStorage.removeItem(
                'memodget_session'
            )

            setUser(null)
        } catch (error) {
            console.error(
                'Logout request failed:',
                error
            )
        }
    }

    if (checkingSession) {
        return null
    }

    return (
        <Home
            user={user}
            handleGoogleLogin={handleGoogleLogin}
            handleLogout={handleLogout}
        />
    )
}