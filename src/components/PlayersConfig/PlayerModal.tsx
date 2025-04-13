// PlayerModal.tsx
import React, { useState } from 'react'
import Portal from '../ui/Portal/Portal'
import { AnimatePresence } from 'framer-motion'
import SmoothWrapper from '../ui/SmoothWrapper/SmoothWrapper'
import ModalContent from './ModalContent'
import MainButton from '../ui/Button/MainButton'
import { statisticStore } from '../../store/statisticStore'

export type PlayerKey = 'player-1' | 'player-2'  

interface PlayerData {
    name: string
    color: string
}

export type TempPlayers = Record<PlayerKey, PlayerData>  

const PlayerModal: React.FC = () => {
    const [show, setShow] = useState<boolean>(false)
    const { players, updatePlayer } = statisticStore()

    const [tempPlayers, setTempPlayers] = useState<TempPlayers>({
        'player-1': { name: '', color: '' },
        'player-2': { name: '', color: '' }
    })

    const openModal = () => {
        setTempPlayers({
            'player-1': { ...players['player-1'] },
            'player-2': { ...players['player-2'] }
        })
        setShow(true)
    }

    const handleUpdate = () => {
        (Object.entries(tempPlayers) as [PlayerKey, PlayerData][]).forEach(([key, data]) => {
            updatePlayer(key, data)
        })
        setShow(false)
    }

    const closeModal = () => {
        setShow(false)
    }

    return (
        <>
            <MainButton colorVariant='blue' onClick={openModal} type='button'>
                change name / color
            </MainButton>

            <Portal>
                <AnimatePresence mode='wait'>
                    {show && (
                        <>
                            <SmoothWrapper className='modal players-config'>
                                <ModalContent
                                    tempPlayers={tempPlayers}
                                    setTempPlayers={setTempPlayers}
                                    handleUpdate={handleUpdate}
                                    closeModal={closeModal}
                                />
                            </SmoothWrapper>

                            <SmoothWrapper className='overlay' onClick={closeModal} />
                        </>
                    )}
                </AnimatePresence>
            </Portal>
        </>
    )
}

export default PlayerModal
