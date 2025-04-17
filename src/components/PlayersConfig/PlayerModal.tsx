import { useState } from 'react'
import Portal from '../ui/Portal/Portal'
import { AnimatePresence } from 'framer-motion'
import SmoothWrapper from '../ui/SmoothWrapper/SmoothWrapper'
import ModalContent from './ModalContent'


const PlayerModal: React.FC = () => {

    const [show, setShow] = useState<boolean>(true)

    return (
        <Portal>
            <AnimatePresence mode='wait'>
                {show && (
                    <>
                        <SmoothWrapper className='modal players-config'>
                            <ModalContent
                                closeModal={() => setShow(false)}
                            />
                        </SmoothWrapper>

                        <SmoothWrapper className='overlay' onClick={() => setShow(false)} />
                    </>
                )}
            </AnimatePresence>
        </Portal>
    )
}

export default PlayerModal
