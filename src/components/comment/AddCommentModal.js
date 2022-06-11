import React, { useState } from 'react'
import {Modal, Container, Form, Button, Col, Row } from 'react-bootstrap'
import { createComment } from '../../api/comment'


const AddCommentModal = (props) => {
    const {show, user, issueId, refresh, handleClose} = props
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

	return (
        <>
        <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
            <Modal.Header closeButton style={{color:'black'}}>
                Add Comment
            </Modal.Header>
            <Modal.Body>
                    <Form.Control
                    name="description"
                    type="string"
                    onChange={handleChange}
                    />
            </Modal.Body>
        </Modal>
        </>
	)
}

export default AddCommentModal
