import { useState } from 'react'
import Portal from '../ui/Portal/Portal'
import { AnimatePresence } from 'framer-motion'
import SmoothWrapper from '../ui/SmoothWrapper/SmoothWrapper'
import ModalContent from './ModalContent'
import MainButton from '../ui/Button/MainButton'
 

export type PlayerKey = 'player-1' | 'player-2'  

interface PlayerData {
    name: string
    color: string
}

export type TempPlayers = Record<PlayerKey, PlayerData>  

const PlayerModal: React.FC = () => {
    const [show, setShow] = useState<boolean>(false)

    const closeModal = () => {
        setShow(false)
    }

    return (
        <>
            <MainButton colorVariant='blue' onClick={() => setShow(true)} type='button'>
                change name / color
            </MainButton>

            <Portal>
                <AnimatePresence mode='wait'>
                    {show && (
                        <>
                            <SmoothWrapper className='modal players-config'>
                                <ModalContent
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
