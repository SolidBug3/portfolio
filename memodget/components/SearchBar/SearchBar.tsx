import './SearchBar.css'

export default function SearchBar({ onSearch }: { onSearch: (value: string[]) => void }) {
    const handleChange = (value: string) => {
        const flags = value
            .split(',')
            .map(flag => flag.trim().toUpperCase())
            .filter(flag => flag.length > 0)

        onSearch(flags)
    }

    return (
        <div className="search-bar">
            <input
                type="search"
                placeholder="Rechercher..."
                onChange={(event) => handleChange(event.target.value)}
            />
            <button type="button">🔍</button>
        </div>
    )
}