import { useLocation,useParams } from "react-router-dom"
import { Button,ListGroup,ListGroupItem,Row,Col, Spinner } from "react-bootstrap"
import { useEffect,useState } from "react"
import { showProjectIssues } from "../../api/issue"



const ProjectShow = (props) => {

    const {user} = props
    const location = useLocation()
    const {title,description,owner} = location.state
    const params = useParams()
    const {projId} = params
    const [issues,setIssues]=useState(null)

    let issueDetails
    let priorityData = {}
    let statusData = {}



    useEffect(()=>{
        fetchIssues()
    },[])
    
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
    }

    //shows spinner while awaiting for api resp
    if (!issues) {
        return<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
        </Spinner>
        
    //maps issues to create list group items of issues
    } else {
        issueDetails = issues.map((issue,index)=>{
            return(
            <ListGroupItem key={`issueKey${issue._id}`}>
                <Row>
                    <Col
                    className="issue-details"
                    style={{backgroundColor: issue.status==='open'?'lightgreen':'lightgrey'}}
                    >
                        {issue.status}
                    </Col>
                    <Col
                    className="issue-details"
                    style = {{
                        'backgroundColor': issue.priority === 'low' ?
                        'lightyellow' : issue.priority === 'medium' ?
                        'yellow' : issue.priority === 'high'? 'orange':'red'
                    }}
                    >
                        {issue.priority}
                    </Col>
                    <Col className="issue-details">{issue.title}</Col>
                    <Col className="issue-details">{issue.comments.length}</Col>
                </Row>
            </ListGroupItem>
            )

        })
        
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
            </div>
            
		</>
	)
}

export default ProjectShow
