import { useState } from 'react'
import Portal from '../ui/Portal/Portal'
import { AnimatePresence } from 'framer-motion'
import SmoothWrapper from '../ui/SmoothWrapper/SmoothWrapper'
import ModalContent from './ModalContent'
import MainButton from '../ui/Button/MainButton'
import { PlayerKey } from '../../types/types'

const PlayerModal: React.FC<{ playerKey: PlayerKey }> = ({ playerKey }) => {

    const [show, setShow] = useState<boolean>(false)

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
                                    playerKey={playerKey}
                                    closeModal={() => setShow(false)}
                                />
                            </SmoothWrapper>

                            <SmoothWrapper className='overlay' onClick={() => setShow(false)} />
                        </>
                    )}
                </AnimatePresence>
            </Portal>
        </>
    )
}

export default PlayerModal
