import { useParams } from "react-router-dom"
import { Spinner, ButtonGroup, Card } from "react-bootstrap"
import { useEffect,useState } from "react"
import { showProjectIssues } from "../../api/issue"
import { getProject } from "../../api/project"
import IssueDetails from "../issues/IssueDetails"
import IssueNewModal from "../issues/IssueNewModal"
import ProjectEditModal from "./ProjectEditModal"
import { FiEdit3 } from "react-icons/fi"
import {RiDeleteBack2Fill} from "react-icons/ri"
import {GoIssueOpened} from 'react-icons/go'
import DeleteModal from "../shared/DeleteModal"


const ProjectShow = (props) => {

    const {user,msgAlert} = props
    const [project,setProject]=useState(null)
    const params = useParams()
    const {projId} = params
    const [issues,setIssues]=useState(null)
    const [issueOpen,setIssueOpen] = useState(false)
    const [issueRefresh,setIssueRefresh] = useState(false)
    const [projectRefresh,setProjectRefresh] = useState(false)
    const [editOpen,setEditOpen] = useState(false)
    const [deleteOpen,setDeleteOpen] = useState(false)
    const [projectCreated,setProjectCreated] = useState(null)

    let issueDetails

    //resets state vars if a project is edited or new issue is opened
    useEffect(()=>{
        setIssueRefresh(false)
        setProjectRefresh(false)
        fetchProject()
        fetchIssues()
    },[issueRefresh,projectRefresh])
    
    //function used in useEffect to fetch project info and set project date created
    const fetchProject = async () => {
        let apiResp = await getProject(user,projId)
        setProject(apiResp.data.project)
        setProjectCreated(new Date(apiResp.data.project.createdAt).toDateString())
    }

    //function used in useEffect to fetch all project issues from db
    const fetchIssues =  async () => {
        let apiResp = await showProjectIssues(user,projId)
        setIssues(apiResp.data.issues)
    }

    //shows spinner while awaiting for api resp
    if (!issues || !project || !projectCreated) {
        return<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
        </Spinner>
        

    //maps issues to create list group items of issues
    } else {
        issueDetails = <IssueDetails issues={issues}/>  
    }

    // opens delete modal 
    const handleDelete = () => {
        setDeleteOpen(true)
    }

    //rerenders issues index once a new issue is created
	const refreshIssues = () => {
		setIssueRefresh(true)
	}

    //handle function to open New Issue Modal
	const handleNewIssue = () => {
		setIssueOpen(true)
	}

    //refreshes project info if edited
	const refreshProject = () => {
		setProjectRefresh(true)
	}

	return (
		<>
            <div className="project-header">
                <Card className="project-card">
                    <Card.Header className="project-card-header">
                        <span
                        className="project-card-title">
                            {`${project.title}`}</span>
                        {
                            project.owner._id === user._id?
                            <ButtonGroup>
                                <FiEdit3
                                    size={25}
                                    type="button"
                                    className="edit"
                                    onClick={()=>setEditOpen(true)}
                                />
                                <RiDeleteBack2Fill
                                    size={25}
                                    type="button"
                                    className="delete"
                                    onClick={handleDelete}
                                />
                            </ButtonGroup>:<></>
                        }
                    </Card.Header >
                    <Card.Header className="project-card-subheader">
                        <i>
                            Project Owner: {project.owner.firstName} {project.owner.lastName}
                        </i>
                        <i>
                            Created: {projectCreated}
                        </i>
                    </Card.Header>
                    <Card.Body style={{marginBottom:'2%'}}>
                        <p style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <h4>Project Overview</h4>
                            <button onClick={handleNewIssue} className="home-btn">
                                Open Issue <GoIssueOpened size={21}/>
                            </button>
                        </p>
                        <hr/>
                        <p>
                            {project.description}
                        </p>

                    </Card.Body>
                    <div className="project-footer">
                        <h5>Project Issues</h5>
                        {issueDetails}

                    </div>
                    <Card.Footer ></Card.Footer>
                </Card>
            </div>
            <IssueNewModal
				show={issueOpen}
				user={user}
				msgAlert={msgAlert}
				projectSelected={projId}
				refreshIssues={refreshIssues}
				handleClose={() => {
					setIssueOpen(false)
				}}
			/>
            <ProjectEditModal
				show={editOpen}
				user={user}
				msgAlert={msgAlert}
				projectId={projId}
				refreshProject={refreshProject}
				handleClose={() => {
					setEditOpen(false)
				}}
			/>
            <DeleteModal
                show={deleteOpen}
                projId={projId}
                user={user}
                handleClose={() => {
                    setDeleteOpen(false)
                }}
            />
		</>
	)
}

export default ProjectShow