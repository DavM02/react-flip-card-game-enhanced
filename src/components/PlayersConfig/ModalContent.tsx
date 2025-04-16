
import PlayerForm from './PlayerForm'
import { TempPlayers, PlayerKey } from './PlayerModal'
import MainButton from '../ui/Button/MainButton'
import { useState } from 'react'
import { statisticStore } from '../../store/statisticStore'

interface PlayerData {
    name: string
    color: string
}

interface ModalContentProps {
 
    closeModal: () => void
}

const ModalContent: React.FC<ModalContentProps> = ({
 
    closeModal,
}) => {


    const { players, updatePlayer } = statisticStore()
    const [tempPlayers, setTempPlayers] = useState<TempPlayers>({
        'player-1': { name: players['player-1'].name, color: players['player-1'].color },
        'player-2': { name: players['player-2'].name, color: players['player-2'].color }
    })


   
    const handleUpdate = () => {
        (Object.entries(tempPlayers) as [PlayerKey, PlayerData][]).forEach(([key, data]) => {
            updatePlayer(key, data)
        })
        closeModal()
    }

    return (
        
        <>
            <div>
                {(['player-1', 'player-2'] as PlayerKey[]).map((key) => (
                    <PlayerForm
                        key={key}
                        playerKey={key}
                        name={tempPlayers[key].name}
                        color={tempPlayers[key].color}
                        onNameChange={(value) =>
                            setTempPlayers((prev) => ({
                                ...prev,
                                [key]: { ...prev[key], name: value }
                            }))
                        }
                        onColorChange={(value) =>
                            setTempPlayers((prev) => ({
                                ...prev,
                                [key]: { ...prev[key], color: value }
                            }))
                        }
                    />
                ))}
            </div>

            <div className='buttons'>
                <MainButton type='button' onClick={handleUpdate} colorVariant='yellow'>
                    update
                </MainButton>

                <MainButton type='button' onClick={closeModal} colorVariant='red'>
                    cancel
                </MainButton>
            </div>
        </>
    )
}

export default ModalContent
