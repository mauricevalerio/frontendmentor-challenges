import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ImageRules from '../assets/image-rules.svg'
import { globalContext } from '../context/GameContext'

const Rules: React.FC = () => {
    const [show, setShow] = useState<boolean>(false)
    const [showNewGameModal, setNewGameModal] = useState<boolean>(false)

    const handleShow = (): void => { setShow(true) }
    const { handleResetGame, hasGameStarted } = globalContext()

    const handleShowNewGameModal = () => { setNewGameModal(true) }

    return (
        <>
            <div className='d-flex gap-2 mt-auto'>
                <Button onClick={handleShow}>
                    Rules
                </Button>
                {hasGameStarted &&
                    <Button onClick={handleShowNewGameModal}>
                        New Game
                    </Button>}
            </div>


            <Modal centered show={show} fullscreen={'sm-down'} onHide={() => setShow(false)}>
                <Modal.Header>
                    <Modal.Title>Rules</Modal.Title>
                </Modal.Header>
                <Modal.Body><img src={ImageRules} alt='Image Rules' /></Modal.Body>
                <Modal.Header closeButton></Modal.Header>
            </Modal>

            <Modal centered show={showNewGameModal} onHide={() => setNewGameModal(false)}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <p className='text-center'>Do you want to start a new game?</p>
                    <div className='d-flex justify-content-between'>
                        <Button onClick={() => {
                            handleResetGame()
                            setNewGameModal(false)
                        }} variant='success'>Yes</Button>
                        <Button onClick={() => setNewGameModal(false)} variant='secondary'>No</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Rules