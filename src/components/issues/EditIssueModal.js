import React, { useState } from 'react'
import {Modal, Container, Form, Col, Row } from 'react-bootstrap'
import { updateIssue } from '../../api/issue'


const EditIssueModal = (props) => {

    const { show, user, handleClose, refreshIssues, options, issueId, msgAlert } = props
    const [issue,setIssue] = useState('')
  
  
    // updates the project state variable for each key stroke
    const handleChange = (e) => {
        // e === event
        e.persist()
  
        setIssue((prevTrans) => {
        const name = e.target.name
        let value = e.target.value
  
        const updatedValue = { [name]: value }
  
        return { ...prevTrans, ...updatedValue }
        })
    }

    //updates issue on submit and closes modal
    const handleSubmit = async (e) => {
        e.preventDefault()
        updateIssue(user,issueId,issue)
        refreshIssues()
        handleClose()
    }


	return (
        <>
        <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        >
        <Modal.Header closeButton style={{ color: 'black' }}>
            Update Issue
        </Modal.Header>
        <Modal.Body>
            <Container className="justify-content-center">
            <Form onSubmit={handleSubmit} className="modal-form">
                <Row>
                <Col>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                    className='modal-field'
                    name="title"
                    type="string"
                    onChange={handleChange}
                    />
                </Col>
                </Row>
                <Row>
                <Col>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    className='modal-field'
                    name="description"
                    type="string"
                    as="textarea"
                    rows={6}
                    onChange={handleChange}
                    />
                </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="formBasicSelect" className='modal-field'>
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                            onChange={handleChange}
                            name="status"
                            type="string"
                            >
                                <option>select status</option>
                                <option value={'open'}>Open</option>
                                <option value={'closed'}>Closed</option>
                                </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formBasicSelect" className='modal-field'>
                            <Form.Label>Priority</Form.Label>
                            <Form.Select
                            onChange={handleChange}
                            name="priority"
                            type="string"
                            >
                                <option>select priority</option>
                                <option value={'low'}>1 low</option>
                                <option value={'medium'}>2 medium</option>
                                <option value={'high'}>3 high</option>
                                <option value={'critical'}>4 critical</option>
                                </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <button className="modal-btn" type="submit">
                Add Issue
                </button>
            </Form>
            </Container>
        </Modal.Body>
        </Modal>
        </>
	)
}

export default EditIssueModal
