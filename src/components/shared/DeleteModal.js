
import {Modal, Container, Form, Button, Col, Row } from 'react-bootstrap'


const DeleteModal = (props) => {

    const { show, user, handleClose} = props



	return (
        <Modal show={show} onHide={handleClose} className="modal">
            <Modal.Header closeButton>
                Delete
            </Modal.Header>
            <Modal.Body style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                <p>Click to Delete Project</p>
                <button className='modal-btn'>
                    Click Me
                </button>

            </Modal.Body>

        </Modal>
	)
}

export default DeleteModal
