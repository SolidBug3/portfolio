import './CircleProgress.css'

export default function CircleProgress({
    total,
    red
}: {
    total: number
    red: number
}) {
    const percentage = total > 0
        ? Math.min((Math.abs(red) / total) * 100, 100)
        : 0

    return (
        <div className="circle-progress">
            <svg viewBox="0 0 100 100">
                <circle
                    className="circle-green"
                    cx="50"
                    cy="50"
                    r="40"
                />

                <circle
                    className="circle-red"
                    cx="50"
                    cy="50"
                    r="40"
                    pathLength="100"
                    strokeDasharray={`${percentage} ${100 - percentage}`}
                />
            </svg>

            <span>{percentage.toFixed(0)}%</span>
        </div>
    )
}