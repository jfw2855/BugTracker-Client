import { useLocation,useParams,useNavigate } from "react-router-dom"
import { Button,ListGroup,ListGroupItem,Row,Col, Spinner, ButtonGroup, Card } from "react-bootstrap"
import { useEffect,useState } from "react"
import { showProjectIssues,removeAllIssues } from "../../api/issue"
import { removeProject, getProject } from "../../api/project"
import IssuePlots from "../issues/IssuePlots"
import IssueDetails from "../issues/IssueDetails"
import IssueNewModal from "../issues/IssueNewModal"
import ProjectEditModal from "./ProjectEditModal"
import { FiEdit3 } from "react-icons/fi"
import {RiDeleteBack2Fill} from "react-icons/ri"


const ProjectShow = (props) => {

    const {user,msgAlert} = props
    const [project,setProject]=useState(null)
    const params = useParams()
    const {projId} = params
    const navigate = useNavigate()
    const [issues,setIssues]=useState(null)
    const [issueOpen,setIssueOpen] = useState(false)
    const [issueRefresh,setIssueRefresh] = useState(false)
    const [projectRefresh,setProjectRefresh] = useState(false)
    const [editOpen,setEditOpen] = useState(false)
    const [priorityLabels,setPriorityLabels] = useState([])
    const [priorityValues,setPriorityValues] = useState([])
    const [ statusLabels, setStatusLabels] = useState([])
    const [ statusValues, setStatusValues] = useState([])

    let issueDetails
    let priorityData = {}
    let statusData = {}
    let pieCharts

    useEffect(()=>{
        //resets state vars for graph data
        setIssueRefresh(false)
        setProjectRefresh(false)
        setPriorityLabels([])
        setPriorityValues([])
        setStatusLabels([])
        setStatusValues([])
        fetchProject()
        fetchIssues()
    },[issueRefresh,projectRefresh])
    
    //function used in useEffect to fetch project info
    const fetchProject = async () => {
        let apiResp = await getProject(user,projId)
        console.log('this is project',apiResp.data.project)
        setProject(apiResp.data.project)
    }

    //function used in useEffect to fetch all project issues from db
    const fetchIssues =  async () => {
        let apiResp = await showProjectIssues(user,projId)
        setIssues(apiResp.data.issues)
        createGData(apiResp.data.issues)  
    }
    
    //function that loops through issues to create issue graphs
    const createGData = (issues) => {
        for (let i in issues) {
            let priority = issues[i].priority
            let status = issues[i].status
            //checks if priority & status exists in objects
            if (priority in priorityData) {
                priorityData[`${priority}`]+=1
            }
            else {
                priorityData[`${priority}`] = 1
            }
            if (status in statusData) {
                statusData[`${status}`]+=1
            }
            else {
                statusData[`${status}`] = 1
            }
        }
        //pushes issue status and priority data to arrays
        for (let key in priorityData) {
            setPriorityLabels(prevVal => [...prevVal,key])
            setPriorityValues(prevVal => [...prevVal,priorityData[key]])
        }
        for (let key in statusData) {
            setStatusLabels(prevVal=>[...prevVal,key])
            setStatusValues(prevVal=>[...prevVal,statusData[key]])
        }
    }

    //shows spinner while awaiting for api resp
    if (!issues || !project) {
        return<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
        </Spinner>
        
    //maps issues to create list group items of issues
    } else {
        issueDetails = <IssueDetails issues={issues}/>  
    }

    //renders piechart component
    if (statusValues.length>0) {
        pieCharts=<IssuePlots
        priorityValues={priorityValues}
        priorityLabels={priorityLabels}
        statusValues={statusValues}
        statusLabels={statusLabels}
        />
    }

    // handle delete function that will remove project from db
    const handleDelete = async (e) => {
        e.preventDefault()
        await removeAllIssues(user,projId)
        await removeProject(user,projId)
        //returns back to home page after removing project
        navigate('/')
    }

    //rerenders issues index once a new issue is created
	const refreshIssues = () => {
		setIssueRefresh(true)
	}

    //handle function to open New Issue Modal
	const handleNewIssue = () => {
		setIssueOpen(true)
	}

    //rerenders project index once a new project is created
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
                    </Card.Header>
                    <Card.Body>
                        <h6>Project Overview</h6>
                        <hr/>
                        <p>
                            {project.description}
                        </p>

                    </Card.Body>
                    <Card.Footer>
                        <i>
                            Created By: {project.owner.firstName} {project.owner.lastName}
                        </i>
                    </Card.Footer>
                </Card>
                
                <div >
                    {pieCharts}
                </div>
            </div>
            <div className="project-footer">
                <ListGroupItem style={{width:'70%'}}>
                    <Row>
                        <Col className="issue-details">Status</Col>
                        <Col className="issue-details">Priority</Col>
                        <Col className="issue-details">Issue</Col>
                        <Col className="issue-details">Comments</Col>
                    </Row>
                </ListGroupItem>
                <ListGroup className="issues-listgroup">
                    {issueDetails}
                </ListGroup>
                <Button onClick={handleNewIssue} className="home-btn">
						Create New Issue
				</Button>
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
		</>
	)
}

export default ProjectShow