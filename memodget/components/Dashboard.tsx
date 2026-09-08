import { useState } from 'react'

import '../css/dashboard/panel.css'
import '../css/dashboard/button.css'
import '../css/dashboard/toolbar.css'

import overview_icon from '../img/panel-icons/overview.png'
import operations_icon from '../img/panel-icons/operations.png'

import BodySelector from './BodySelector'
import OverView from '../components/dashboard/overview'

export default function Dashboard({ user }: { user: { id: number, email: string, name: string | null } }) {
    const [page, setPage] = useState(0)

    return (
        <>
            <BodySelector />

            <div className="dashboard">
                <aside className="panel">
                    <nav>
                        <button onClick={() => setPage(0)}>
                            <img src={overview_icon} />
                            <span>stats</span>
                        </button>

                        <button onClick={() => setPage(1)}>
                            <img src={operations_icon} />
                            <span>operations</span>
                        </button>
                    </nav>
                </aside>

                <main className="dashboard-content">
                    {page === 0 && <OverView user={user} />}
                </main>
            </div>
        </>
    )
}