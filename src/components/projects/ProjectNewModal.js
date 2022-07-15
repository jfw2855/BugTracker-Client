import React, { useState } from 'react'
import {Modal, Container, Form, Button, Col, Row } from 'react-bootstrap'


const ProjectNewModal = (props) => {

    const { show, user, refreshProjects, createProject, handleClose, msgAlert } = props
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
        await createProject(user,project)
        refreshProjects()
        handleClose()
    }


  return (
    <>
    <Modal
    size='lg'
    show={show}
    onHide={handleClose}
    className='modal'>
      <Modal.Header
      closeButton
      className='modal-header'
      >
        Create Project
      </Modal.Header>
      <Modal.Body>
        <Container className="justify-content-center">
          <Form
          className='modal-form'
          onSubmit={handleSubmit}>
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
                  as="textarea"
                  rows={7}
                  name="description"
                  type="string"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <button className="modal-btn" type="submit">
              Add Project
            </button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
    </>
  )
}

export default ProjectNewModal
