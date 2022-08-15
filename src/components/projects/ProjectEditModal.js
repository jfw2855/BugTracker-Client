import React, { useState } from 'react'
import {Modal, Container, Form, Button, Col, Row } from 'react-bootstrap'
import { updateProject } from "../../api/project"


const ProjectEditModal = (props) => {

    const { show, user, refreshProject, handleClose, projectId, msgAlert } = props
    const [project, setProject] = useState('')

    // updates the project state variable for each key stroke
    const handleChange = (e) => {
        // e === event
        e.persist()

        setProject((prevTrans) => {
        const name = e.target.name
        let value = e.target.value

        const updatedValue = { [name]: value }

        return { ...prevTrans, ...updatedValue }
        })
    }

    //creates new project in the db and refreshes ProjectsIndex component
    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateProject(user,project,projectId)
        refreshProject()
        handleClose()
    }


  return (
    <>
        <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton style={{ color: 'black' }}>
        Update Project
      </Modal.Header>
      <Modal.Body>
        <Container className="justify-content-center">
          <Form onSubmit={handleSubmit} className="modal-form">
            <Row>
              <Col>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="string"
                  className='modal-field'
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  name="description"
                  type="string"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <button className="modal-btn" type="submit">
              Update
            </button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default ProjectEditModal