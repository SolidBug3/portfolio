import '../css/index.css'
import '../css/background.css'

import GoogleButton from '../components/GoogleButton'
import Presentation from '../components/Presentation'
import HomeProps from '../components/Session'


export default function Home({ user, handleGoogleLogin, handleLogout }: HomeProps) {
    return (
        <div>
            <div className="header">
                <GoogleButton />
            </div>

            {user ? (<div> You are not connected </div> ) : ( <Presentation /> )}
        </div>
    )
}