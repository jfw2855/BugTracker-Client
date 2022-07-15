import React, { useState } from 'react'
import {Modal, Container, Form, Button, Col, Row } from 'react-bootstrap'
import { createComment } from '../../api/comment'


const AddCommentModal = (props) => {
    const {show, user, issueId, refreshComments, handleClose} = props
    const [comment,setComment] = useState('')

    const handleChange = (e) => {
        // e === event
        e.persist()
  
        setComment((prevTrans) => {
        const name = e.target.name
        let value = e.target.value
  
        const updatedValue = { [name]: value }
  
        return { ...prevTrans, ...updatedValue }
        })
    }

    //creates new comment 
    const handleSubmit = async (e) => {
        e.preventDefault()
        await createComment(user,issueId,comment)
        refreshComments()
        handleClose()
    }

	return (
        <>
        <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        className="modal">
            <Modal.Header closeButton className='modal-header'>
                Comment
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit} className="modal-form">
                    <Form.Control
                    as='textarea'
                    rows={8}
                    name="body"
                    type="string"
                    onChange={handleChange}
                    />
                <button className="modal-btn" type="submit">
                Add Comment
                </button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
	)
}

export default AddCommentModal
