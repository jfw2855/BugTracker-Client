
import {Button, Modal} from 'react-bootstrap'
import { removeAllIssues, removeIssue } from '../../api/issue'
import { removeProject } from '../../api/project'
import { useNavigate } from 'react-router-dom'


const DeleteModal = (props) => {

    const { show, user, handleClose, projId, issueId, projectNavId} = props
    const navigate = useNavigate()

     // handle delete function that will remove project from db
    const deleteProject = async(e) => {
        e.preventDefault()
        await removeAllIssues(user,projId)
        await removeProject(user,projId)
        //returns back to home page after removing project
        navigate('/')
    }

    // handle delete function that will remove issue from db
    const deleteIssue = async(e) => {
        e.preventDefault()
        await removeIssue(user,issueId)
        //returns back to project show page after removing issue
        navigate(`/project/${projectNavId}`)
    }

    // 

	return (
        <Modal show={show} onHide={handleClose} className="modal">
            <Modal.Header closeButton>
                Delete {issueId?"Issue":"Project"}
            </Modal.Header>
            <Modal.Body style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
                <p>Item cannot be retrieved once deleted</p>
                <Button className='modal-btn' variant="danger" onClick={issueId?deleteIssue:deleteProject}>
                    Delete {issueId?"Issue":"Project"}
                </Button>

            </Modal.Body>

        </Modal>
	)
}

export default DeleteModal
