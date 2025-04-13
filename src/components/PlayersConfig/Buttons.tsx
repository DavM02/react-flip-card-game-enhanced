import React from 'react'
import MainButton from '../ui/Button/MainButton'

interface ButtonsProps {
    handleUpdate: () => void
    closeModal: () => void
}

const Buttons: React.FC<ButtonsProps> = ({ handleUpdate, closeModal }) => {
    return (
        <div className='buttons'>
            <MainButton type='button' onClick={handleUpdate} colorVariant='yellow'>
                update
            </MainButton>

            <MainButton type='button' onClick={closeModal} colorVariant='red'>
                cancel
            </MainButton>
        </div>
    )
}

export default Buttons
