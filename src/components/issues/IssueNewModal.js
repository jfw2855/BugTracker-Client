import React, { useState } from 'react'
import {Modal, Container, Form, Button, Col, Row } from 'react-bootstrap'
import { createIssue } from '../../api/issue'


const IssueNewModal = (props) => {

  const { show, user, handleClose, refreshIssues, options, projectSelected, msgAlert } = props
  const [issue,setIssue] = useState('')
  const [projId,setProjId] = useState('')


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

  const handleProjectId = (e) => {
    e.persist()
    setProjId(e.target.value) 
    
  }
  //creates new issue in the db
  const handleSubmit = async (e) => {
    e.preventDefault()
    //checks to see if project is preselected (from project show page)
    projectSelected?
    await createIssue(issue,projectSelected,user)
    :await createIssue(issue,projId,user)

    refreshIssues()
    handleClose()
  }


  return (
    <>
    <Modal
    size="lg"
    show={show}
    onHide={handleClose}
    className="modal">
      <Modal.Header className='modal-header'>
        Open Issue
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
                  maxLength={55}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Description of Issue</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  className='modal-field'
                  name="description"
                  type="string"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {projectSelected?
                <Form.Control
                className='modal-field'
                name="projectId"
                type="string"
                hidden
                readOnly
                value={projectSelected}
                />
                :
                <Form.Group controlId="formBasicSelect" className='modal-field'>
                  <Form.Label>Project</Form.Label>
                    <Form.Select
                    onChange={handleProjectId}
                    name="projectId"
                    type="string"
                    >
                      <option>select project</option>
                      {options}
        
                    </Form.Select>
                </Form.Group>
                }
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

export default IssueNewModal
