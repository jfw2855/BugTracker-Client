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


    useEffect(()=>{
        fetchIssues()
    },[])

    //function used in useEffect to fetch all project issues from db
    const fetchIssues =  async () => {
        let apiResp = await showProjectIssues(user,projId)
        setIssues(apiResp.data.issues)
        console.log('this is issues from apiResp!!!!',apiResp.data.issues)   
    }

    //shows spinner while awaiting for api resp
    if (!issues) {
        return<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
        </Spinner>
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
            <h1>{`Project: ${title}`}</h1>
            <Button variant='warning'>
                Edit
            </Button>
            <Button variant='danger'>
                Remove Project
            </Button>
            <p>
                {description}
            </p>
            <div>
                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col className="issue-details">Status</Col>
                            <Col className="issue-details">Priority</Col>
                            <Col className="issue-details">Issue</Col>
                            <Col className="issue-details">Comments</Col>
                        </Row>
                    </ListGroupItem>
                    {issueDetails}
                </ListGroup>
            </div>
            
		</>
	)
}

export default ProjectShow
