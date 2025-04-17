import PlayerForm from './PlayerForm'
import MainButton from '../ui/Button/MainButton'
import { useState } from 'react'
import { statisticStore } from '../../store/statisticStore'
import { PlayerKey } from '../../types/types'

interface PlayerData {
    name: string
    color: string
}

interface ModalContentProps {
    closeModal: () => void
}

const ModalContent: React.FC<ModalContentProps> = ({ closeModal }) => {
    const { players, updatePlayer } = statisticStore()

    // local state եմ ստեղծում, որ փոփոխությունները ստեղ կիրառվեն 
    // ու button-ը click անելուց հետո նոր store-ում եմ պահում, որ ամեն անգամ store-ում trigger չանեմ, նույն ձևով էլ timerner-ը


    const [tempPlayers, setTempPlayers] = useState<Record<PlayerKey, PlayerData>>({
        'player-1': { name: players['player-1'].name, color: players['player-1'].color },
        'player-2': { name: players['player-2'].name, color: players['player-2'].color }
    })

    const handleUpdate = () => {
        updatePlayer('player-1', tempPlayers['player-1'])
        updatePlayer('player-2', tempPlayers['player-2'])
        closeModal()
    }

    return (
        <>
            <div>
                {(['player-1', 'player-2'] as PlayerKey[]).map((playerKey) => (
                    <PlayerForm
                        key={playerKey}
                        playerKey={playerKey}
                        name={tempPlayers[playerKey].name}
                        color={tempPlayers[playerKey].color}
                        onNameChange={(value) => {
                            setTempPlayers((prev) => ({
                                ...prev,
                                [playerKey]: {
                                    ...prev[playerKey],
                                    name: value
                                }
                            }))
                        }}
                        onColorChange={(value) => {
                            setTempPlayers((prev) => ({
                                ...prev,
                                [playerKey]: {
                                    ...prev[playerKey],
                                    color: value
                                }
                            }))
                        }}
                    />
                ))}
            </div>

            <MainButton type="button" onClick={handleUpdate} colorVariant="yellow">
                Update
            </MainButton>
        </>
    )
}

export default ModalContent
