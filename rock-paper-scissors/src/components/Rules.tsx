import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ImageRules from '../assets/image-rules.svg'

const Rules: React.FC = () => {
    const [show, setShow] = useState<boolean>(false)

    const handleShow = (): void => { setShow(true) }

    return (
        <>
            <Button onClick={handleShow} className='rules__btn'>
                Rules
            </Button>

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