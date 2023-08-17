import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ImageRules from '../assets/image-rules.svg'
import { globalContext } from '../context/GameContext'

const Rules: React.FC = () => {
    const [show, setShow] = useState<boolean>(false)

    const handleShow = (): void => { setShow(true) }
    const { handleResetGame, hasGameStarted } = globalContext()

    return (
        <>
            <div className='d-flex gap-2 mt-auto'>
                <Button onClick={handleShow}>
                    Rules
                </Button>
                {hasGameStarted &&
                    <Button onClick={handleResetGame}>
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
        </>
    )
}

export default Rules