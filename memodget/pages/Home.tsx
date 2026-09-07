import '../css/index.css'
import '../css/background.css'

import GoogleButton from '../components/GoogleButton'
import Presentation from '../components/Presentation'
import type HomeProps from '../components/Session'

export default function Home({ user, handleGoogleLogin, handleLogout }: HomeProps) {
    return (
        <div>
            <div className="header">
                <GoogleButton
                    user={user}
                    handleGoogleLogin={handleGoogleLogin}
                    handleLogout={handleLogout} />
            </div>

            {user ? (<div> You are connected </div> ) : ( <Presentation /> )}
        </div>
    )
}