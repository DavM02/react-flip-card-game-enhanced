

interface PlayerFormProps {
    playerKey: string
    name: string
    color: string
    onNameChange: (value: string) => void
    onColorChange: (value: string) => void
}

const PlayerForm: React.FC<PlayerFormProps> = ({
    playerKey,
    name,
    color,
    onNameChange,
    onColorChange
}) => {
    return (
        <div>
            <h3>{playerKey}:</h3>
            <input
                type='text'
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
            />
            <div className='player-color'>
                <div className='color' style={{ backgroundColor: color }}></div>
                <input
                    id={`${playerKey}-color`}
                    type='color'
                    value={color}
                    onChange={(e) => onColorChange(e.target.value)}
                />
                <label htmlFor={`${playerKey}-color`}>Change color</label>
            </div>
        </div>
    )
}

export default PlayerForm
