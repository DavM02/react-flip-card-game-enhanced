
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
    closeModal: () => void,
    playerKey: PlayerKey
}

const ModalContent: React.FC<ModalContentProps> = ({
    playerKey,
    closeModal,
}) => {

    const { players, updatePlayer } = statisticStore()

    // local state եմ ստեղծում, որ փոփոխությունները ստեղ կիրառվեն 
    // ու button-ը click անելուց հետո նոր store-ում եմ պահում, որ ամեն անգամ store-ում trigger չանեմ, նույն ձևով էլ timerner-ը

    const [tempPlayer, setTempPlayer] = useState<PlayerData>({ name: players[playerKey].name, color: players[playerKey].color })


    const handleUpdate = () => {
        updatePlayer(playerKey, tempPlayer)
        closeModal()
    }

    return (

        <>
            <PlayerForm
                playerKey={playerKey}
                name={tempPlayer.name}
                color={tempPlayer.color}
                onNameChange={(value) => {
                    setTempPlayer((prev) => (
                        {
                            ...prev,
                            name: value
                        }
                    ))
                }}
                onColorChange={(value) => {
                    setTempPlayer((prev) => (
                        {
                            ...prev,
                            color: value
                        }
                    ))
                }}

            />

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
