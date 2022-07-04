import { useEffect,useState } from "react"
import { useLocation,useParams,useNavigate } from "react-router-dom"
import { Button,ListGroup,ListGroupItem,Row,Col, Spinner, ButtonGroup, Card } from "react-bootstrap"
import { getIssue, removeIssue, updateIssue } from "../../api/issue"
import AddCommentModal from "../comment/AddCommentModal"
import CommentDetails from "../comment/CommentDetails"
import EditIssueModal from "./EditIssueModal"
import { FiEdit3 } from "react-icons/fi"
import {RiDeleteBack2Fill} from "react-icons/ri"

const IssueShow = (props) => {

    const {user,msgAlert} = props
    const params = useParams()
    const {issueId} = params
    const navigate = useNavigate()
    const [issue,setIssue] = useState(null)
    const [modalOpen,setModalOpen] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const [comments,setComments] = useState(null)
    const [openDate,setOpenDate] = useState(null)
    const [closeDate,setCloseDate] = useState(null)
    const [issueOpen,setIssueOpen] = useState(false)

    useEffect(()=> {
        setRefresh(false)
        fetchIssue()
        
    },[refresh])

    //function used in useEffect to fetch issue info
    const fetchIssue = async () => {
        let apiResp = await getIssue(user,issueId)
        setIssue(apiResp.data.issue)
        let created = new Date (apiResp.data.issue.createdAt)
        let updated = new Date (apiResp.data.issue.updatedAt)
        setOpenDate(created.toDateString())
        setCloseDate(updated.toDateString())
        setComments(apiResp.data.issue.comments)
        console.log('apiresp',apiResp.data.issue)
    }

    //awaits for apiresponse beforing rendering
    if (!comments) {
        return (
            <p>Loading..</p>
        )
    }

    // handle delete function that will remove issue from db
    const handleDelete = async (e) => {
        e.preventDefault()
        await removeIssue(user,issueId)
        //returns back to home page after removing issue
        navigate('/')
    }

    const handleStatus = async(e) => {
        e.preventDefault()
        console.log('clickeeddd')
        let newIssue = issue
        newIssue.status = issue.status==="open"?"closed":"open"
        await updateIssue(user,issueId,newIssue)
        setRefresh(true)
    }


	return (
        <div className="issueshow-container">
        <div className="issue-header">
            <Card >
                <Card.Header>
                    Project: {issue.project.title}
                    <ButtonGroup>
                        <Button onClick={()=>setIssueOpen(true)}>
                            <FiEdit3/>
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            <RiDeleteBack2Fill/>
                        </Button>
                    </ButtonGroup>
                </Card.Header>
                <Card.Body>
                    <h4>Description:</h4>
                    <p>{issue.description}</p>
                    <hr/>

                </Card.Body>
            </Card>
            <Card className="issuedescr-container">
                <h4>Issue: {issue.title}</h4>
                <div>
                    <h5>Comments: </h5>
                    <ListGroup>
                        <CommentDetails
                        comments={comments} 
                        user={user}
                        issueId={issueId}
                        refresh={()=>setRefresh(true)}
                        />
                    </ListGroup>
                    <Button onClick={()=>setModalOpen(true)}>
                        Add Comment
                    </Button>
                </div>
            </Card>
        </div>
        <div className="issueinfo-container">
            <div className="status-container">
                <h4>Status:&nbsp;
                    <button
                    className={issue.status==="open"?"open":"closed"}
                    onClick={handleStatus}
                    >
                        {issue.status}
                    </button>
                </h4>
                <h4>Priority:&nbsp;
                    <span
                    className={issue.priority=="low"?"low":issue.priority=="medium"?
                    "medium":issue.priority=="high"?"high":"critical"}
                    >
                        {issue.priority}
                    </span>
                </h4>
            </div>
            <div className="team-container">
                <h4>Opened by: {issue.owner.firstName} {issue.owner.lastName}</h4>
                <h4>Opened: {openDate}</h4>
                {issue.status==="open"?
                <></>:<h4>Closed: {closeDate}</h4>}
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
        <EditIssueModal
            show={issueOpen}
            user={user}
            msgAlert={msgAlert}
            issueId={issueId}
            refreshIssues={()=>setRefresh(true)}
            handleClose={() => {
                setIssueOpen(false)
            }}
        />

        </div>
	)
}

export default IssueShow
