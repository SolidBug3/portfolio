import '../css/index.css'
import '../css/background.css'

import Logo from '../components/Logo'
import GoogleButton from '../components/GoogleButton'
import Presentation from '../components/Presentation'
import type HomeProps from '../components/Session'

export default function Home({ user, handleGoogleLogin, handleLogout }: HomeProps) {
    return (
        <div>
            <div className="header">
            <Logo />
                <GoogleButton
                    user={user}
                    handleGoogleLogin={handleGoogleLogin}
                    handleLogout={handleLogout} />
            </div>

            {user ? (<div> You are connected </div> ) : ( <Presentation /> )}
        </div>
    )
}