import { useLocation,useParams } from "react-router-dom"
import { Button,ListGroup,ListGroupItem,Row,Col, Spinner } from "react-bootstrap"
import { useEffect,useState } from "react"
import { showProjectIssues } from "../../api/issue"
import IssuePlots from "../issues/IssuePlots"
import IssueDetails from "../issues/IssueDetails"
import IssueNewModal from "../issues/IssueNewModal"


const ProjectShow = (props) => {

    const {user,msgAlert} = props
    const location = useLocation()
    const {title,description,owner} = location.state
    const params = useParams()
    const {projId} = params
    const [issues,setIssues]=useState(null)
    const [issueOpen,setIssueOpen] = useState(false)
    const [issueRefresh,setIssueRefresh] = useState(false)
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
        setPriorityLabels([])
        setPriorityValues([])
        setStatusLabels([])
        setStatusValues([])
        fetchIssues()
    },[issueRefresh])
    
    //function used in useEffect to fetch all project issues from db
    const fetchIssues =  async () => {
        let apiResp = await showProjectIssues(user,projId)
        setIssues(apiResp.data.issues)
        console.log('this is issues from apiResp!!!!',apiResp.data.issues)
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
        console.log('this is status labels',statusLabels,statusValues)
    }

    //shows spinner while awaiting for api resp
    if (!issues) {
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

    //rerenders issues index once a new issue is created
	const refreshIssues = () => {
		setIssueRefresh(true)
	}

    //handle function to open New Issue Modal
	const handleNewIssue = () => {
		setIssueOpen(true)
	}

	return (
		<>
            <div className="project-header">
                <h1>{`Project: ${title}`}</h1>
                <Button variant='warning'>
                    Edit
                </Button>
                <Button variant='danger'>
                    Remove Project
                </Button>
            </div>
            <div className="project-body">
                {pieCharts}
                <p>
                    {description}
                </p>
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
		</>
	)
}

export default ProjectShow