import '../css/index.css'
import '../css/background.css'

import Logo from '../components/Logo'
import GoogleButton from '../components/GoogleButton'
import Presentation from '../components/Presentation'
import Dashboard from '../components/Dashboard'
import type HomeProps from '../components/Session'

export default function Home({ user, handleGoogleLogin, handleLogout }: HomeProps) {
    return (
        <div>
            <div className="header">
                {user ? (<></>) : (<Logo />)}
                <GoogleButton
                    user={user}
                    handleGoogleLogin={handleGoogleLogin}
                    handleLogout={handleLogout} />
            </div>

            {user ? (<Dashboard user={user} />) : (<Presentation />)}
        </div>
    )
}