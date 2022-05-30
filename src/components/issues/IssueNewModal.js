import React, { useState } from 'react'
import {Modal, Container, Form, Button, Col, Row } from 'react-bootstrap'


const IssueNewModal = (props) => {

  const { show, user, handleClose, options, msgAlert } = props
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




  return (
    <>
    <Modal show={show} onHide={handleClose} style={{ color: 'black' }}>
      <Modal.Header closeButton style={{ color: 'black' }}>
        Create Issue
      </Modal.Header>
      <Modal.Body>
        <Container className="justify-content-center">
          <Form >
            <Row>
              <Col>
                <Form.Label>Title</Form.Label>
                <Form.Control
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
                  name="description"
                  type="string"
                  onChange={handleChange}
                />
              </Col>
            </Row>
              <Form.Group controlId="formBasicSelect">
                <Form.Label>Projects</Form.Label>
                  <Form.Select
                  onChange={handleChange}
                  >
                    <option>select project</option>
                    {options}
      
                    </Form.Select>
              </Form.Group>
            <Button className="new-transaction-btn" type="submit">
              Add Project
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default IssueNewModal
