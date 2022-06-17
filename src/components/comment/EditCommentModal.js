import React, { useState } from 'react'
import {Modal, Container, Form, Button, Col, Row } from 'react-bootstrap'
import { updateComment } from '../../api/comment'


const EditCommentModal = (props) => {

        const {user,show,commentId,issueId,refreshComments,handleClose,body} = props
        const [comment,setComment] = useState(body)

        //handle function that tracks changes in form
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
        
            //updates comment
            const handleSubmit = async (e) => {
                e.preventDefault()
                await updateComment(user,issueId,commentId,comment)
                refreshComments()
                handleClose()
            }


	return (
        
        <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
            <Modal.Header closeButton style={{color:'black'}}>
                Edit Comment
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                    name="body"
                    type="string"
                    defaultValue={body}

                    onChange={handleChange}
                    style={{height:'200px'}}
                    />
                <Button className="new-issue-btn" type="submit">
                Update
                </Button>
                </Form>
            </Modal.Body>
        </Modal>
	)
}

export default EditCommentModal
