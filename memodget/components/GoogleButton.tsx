import '../css/GoogleButton.css'
import GoogleImage from '../img/google.png'

import type HomeProps from './Session'

export default function GoogleButton({ user, handleGoogleLogin, handleLogout }: HomeProps) {
    return (
        <button
            type="button"
            className="GoogleButton"
            onClick={() => user ? handleLogout() : handleGoogleLogin()}
        >
            <img src={GoogleImage} alt="" />
        </button>
    )
}