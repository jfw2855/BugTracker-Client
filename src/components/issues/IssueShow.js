import { useEffect,useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import { ListGroup, ButtonGroup, Card } from "react-bootstrap"
import { getIssue, updateIssue } from "../../api/issue"
import AddCommentModal from "../comment/AddCommentModal"
import CommentDetails from "../comment/CommentDetails"
import EditIssueModal from "./EditIssueModal"
import { FiEdit3 } from "react-icons/fi"
import {RiDeleteBack2Fill} from "react-icons/ri"
import {BiCommentAdd} from "react-icons/bi"
import {AiOutlineProject} from "react-icons/ai"
import DeleteModal from "../shared/DeleteModal"

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
    const [deleteOpen,setDeleteOpen] = useState(false)

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
    }

    //awaits for apiresponse beforing rendering
    if (!comments) {
        return (
            <p>Loading..</p>
        )
    }

    // opens delete modal
    const handleDelete = () => {
        setDeleteOpen(true)
    }

    // handle status function that changes the issue status
    const handleStatus = async(e) => {
        e.preventDefault()
        let newIssue = issue
        newIssue.status = issue.status==="open"?"closed":"open"
        await updateIssue(user,issueId,newIssue)
        setRefresh(true)
    }


	return (
        <div className="issueshow-container">
        <div className="issue-header">
            <Card className="issuedescr-container">
                <Card.Header className="issuecard-header">
                    <h4>{issue.title}</h4>
                    <ButtonGroup>
                        <button
                        className="btn edit"
                        onClick={()=>setIssueOpen(true)}>
                            <FiEdit3
                                className="edit"
                            />
                        </button>
                        <button
                        className="btn"
                        onClick={handleDelete}>
                            <RiDeleteBack2Fill
                                className="delete"
                            />
                        </button>
                    </ButtonGroup>
                </Card.Header>
                <Card.Body>
                    <h5>Issue</h5>
                    <hr/>
                    <p>{issue.description}</p>

                </Card.Body>
                <Card.Footer>
                    <i>Created By: {issue.owner.firstName} {issue.owner.lastName} on {openDate}</i>
                </Card.Footer>
            </Card>
            <Card className="issuedescr-container">
                <Card.Header className="issuecard-header">
                    <h5>Activity </h5>
                    <button
                    className="btn"
                    onClick={()=>setModalOpen(true)}>
                        <BiCommentAdd className="add"/>
                    </button>

                </Card.Header>
                
                <Card.Body>
                    <ListGroup>
                        <CommentDetails
                        comments={comments} 
                        user={user}
                        issueId={issueId}
                        refresh={()=>setRefresh(true)}
                        />
                    </ListGroup>
                </Card.Body>
            </Card>
        </div>
        <Card className="issueinfo-container">
            <Card.Header className="stat-container">
                <h4>Status:&nbsp;
                    <button
                    className={issue.status}
                    onClick={handleStatus}
                    >
                        {issue.status}
                    </button>
                </h4>
                <h4>Priority:&nbsp;
                    <span
                    className={issue.priority}
                    >
                        {issue.priority}
                    </span>
                </h4>
            </Card.Header>
            <Card.Body>
                <div className="project">
                    <span >Project: {issue.project.title}</span>
                    <AiOutlineProject
                        className="project-icon"
                        type="button"
                        onClick={()=>navigate(`/project/${issue.project._id}`)} 
                    />
                </div>
                <hr/>
                <i>Created:</i>
                <h6>{openDate} by {issue.owner.firstName} {issue.owner.lastName}</h6>
                {issue.status==="open"?
                <></>:
                <>
                <i>Closed:</i>
                <h6>{closeDate}</h6>
                </>}
            </Card.Body>
        </Card>
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
        <DeleteModal
            show={deleteOpen}
            issueId={issueId}
            user={user}
            projectNavId={issue.project._id}
            handleClose={() => {
                setDeleteOpen(false)
            }}
        />
        </div>
	)
}

export default IssueShow
