import './BudgetSelector.css'
import { useState } from 'react'

export default function BudgetSelector({ onChange }: { onChange: (year: number, month: number) => void }) {
    const [year, setYear] = useState(() => {
        const storedYear = sessionStorage.getItem('memodget_year')

        return storedYear ? Number(storedYear) : 2026
    })

    const [month, setMonth] = useState(() => {
        const storedMonth = sessionStorage.getItem('memodget_month')

        return storedMonth ? Number(storedMonth) : 9
    })

    const changeMonth = (value: number) => {
        setMonth(value)
        sessionStorage.setItem('memodget_month', String(value))
        onChange(year, value)
    }

    const changeYear = (value: number) => {
        setYear(value)
        sessionStorage.setItem('memodget_year', String(value))
        onChange(value, month)
    }

    return (
        <div className="BudgetSelector">
            <select
                value={month}
                onChange={(event) => changeMonth(Number(event.target.value))}
            >
                <option value="1">Janvier</option>
                <option value="2">Février</option>
                <option value="3">Mars</option>
                <option value="4">Avril</option>
                <option value="5">Mai</option>
                <option value="6">Juin</option>
                <option value="7">Juillet</option>
                <option value="8">Août</option>
                <option value="9">Septembre</option>
                <option value="10">Octobre</option>
                <option value="11">Novembre</option>
                <option value="12">Décembre</option>
            </select>

            <input
                type="number"
                min="2026"
                max="2100"
                value={year}
                onChange={(event) => changeYear(Number(event.target.value))}
            />
        </div>
    )
}