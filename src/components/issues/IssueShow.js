import { useEffect,useState } from "react"
import { useLocation,useParams,useNavigate } from "react-router-dom"
import { Button,ListGroup,ListGroupItem,Row,Col, Spinner } from "react-bootstrap"
import { getIssue } from "../../api/issue"
import AddCommentModal from "../comment/AddCommentModal"
import CommentDetails from "../comment/CommentDetails"

const IssueShow = (props) => {

    const {user,msgAlert} = props
    const params = useParams()
    const {issueId} = params
    const [issue,setIssue] = useState(null)
    const [modalOpen,setModalOpen] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const [comments,setComments] = useState(null)

    useEffect(()=> {
        setRefresh(false)
        fetchIssue()
        
    },[refresh])

    //function used in useEffect to fetch issue info
    const fetchIssue = async () => {
        let apiResp = await getIssue(user,issueId)
        setIssue(apiResp.data.issue)
        setComments(apiResp.data.issue.comments)
        console.log('apiresp',apiResp.data.issue)
    }

    //awaits for apiresponse beforing rendering
    if (!comments) {
        return (
            <p>Loading..</p>
        )
    }

    // {{
    //     'backgroundColor': issue.priority === 'low' ?
    //     'lightyellow' : issue.priority === 'medium' ?
    //     'yellow' : issue.priority === 'high'? 'orange':'red'
    // }}


	return (
        <>
        <h1>Project: {issue.project.title}</h1>
        <Button>Update Issue</Button>
        <Button variant="danger">Delete</Button>
        <div className="issueinfo-container">
            <div className="status-container">
                <h4>Status:&nbsp;
                    <span
                    className={issue.status==="open"?"open":"closed"}
                    >
                        {issue.status}
                    </span>
                </h4>
                <h4>Priority:&nbsp;
                    <span
                    className={issue.priority=="low"?"low":issue.priority=="medium"?
                    "medium":issue.priority=="high"?"high":"critical"}
                    >
                        {issue.priority}
                    </span>
                </h4>
                <h4>Created: {issue.createdAt}</h4>
            </div>
            <div className="team-container">
                <h4>Opened by: {issue.owner.firstName} {issue.owner.lastName}</h4>
                <h4>Team: </h4>

            </div>
        </div>
        <div className="issuedescr-container">
            <h4>Issue Description:</h4>
            <p>{issue.description}</p>
            <div>
                <h5>Comments: </h5>
                <ListGroup>
                    <CommentDetails comments={comments}/>
                </ListGroup>
                <Button onClick={()=>setModalOpen(true)}>
                    Add Comment
                </Button>
            </div>
        </div>
        <AddCommentModal
				show={modalOpen}
				user={user}
				msgAlert={msgAlert}
				issueId={issueId}
				refreshComments={()=> setRefresh(true)}
				handleClose={() => {
					setModalOpen(false)
				}}
			/>

        </>
	)
}

export default IssueShow
