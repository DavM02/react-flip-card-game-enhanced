
import PlayerForm from './PlayerForm'
import { TempPlayers, PlayerKey } from './PlayerModal'
import MainButton from '../ui/Button/MainButton'

interface ModalContentProps {
    tempPlayers: TempPlayers
    setTempPlayers: React.Dispatch<React.SetStateAction<TempPlayers>>
    handleUpdate: () => void
    closeModal: () => void
}

const ModalContent: React.FC<ModalContentProps> = ({
    tempPlayers,
    setTempPlayers,
    handleUpdate,
    closeModal,
}) => {
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
