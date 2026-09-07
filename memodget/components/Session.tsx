export default interface HomeProps {
    user: {
        id: number
        email: string
        name: string | null
    } | null

    handleGoogleLogin: () => void
    handleLogout: () => void
}