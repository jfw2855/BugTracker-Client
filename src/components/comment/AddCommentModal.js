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
        <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
            <Modal.Header closeButton style={{color:'black'}}>
                Add Comment
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                    name="body"
                    type="string"
                    onChange={handleChange}
                    style={{height:'200px'}}
                    />
                <Button className="new-issue-btn" type="submit">
                Add Comment
                </Button>
                </Form>
            </Modal.Body>
        </Modal>
        </>
	)
}

export default AddCommentModal
