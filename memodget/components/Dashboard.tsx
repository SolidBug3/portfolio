import { useState } from 'react'

import '../css/dashboard/panel.css'
import '../css/dashboard/button.css'
import '../css/dashboard/toolbar.css'

import overview_icon from '../img/panel-icons/overview.png'

import BodySelector from './BodySelector'
import OverView from '../components/dashboard/overview'

export default function Dashboard({ user }: { user: { id: number, email: string, name: string | null } }) {
    const [page, setPage] = useState(0)

    return (
        <><BodySelector />
        <div className="dashboard">
            <aside className="panel">
                <nav>
                    <button onClick={() => setPage(0)}>
                        <img src={overview_icon} />
                        <span><a href="">home</a></span>
                    </button>
                </nav>
            </aside>

            <main className="dashboard-content">
                {page === 0 && <OverView user={user} />}
            </main>
        </div></>
    )
}