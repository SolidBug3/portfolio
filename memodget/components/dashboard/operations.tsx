import Card, { Deck } from "../Card/Card"

export default function Operations({ user }: { user: { id: number, email: string, name: string | null } }) {
    return (
        <>
            <Deck>
                <Card>versement</Card>
                <Card>prélèvement</Card>
            </Deck>
        </>
    )
}