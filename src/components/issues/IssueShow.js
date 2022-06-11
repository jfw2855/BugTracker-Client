import { useEffect,useState } from "react"
import { useLocation,useParams,useNavigate } from "react-router-dom"
import { Button,ListGroup,ListGroupItem,Row,Col, Spinner } from "react-bootstrap"
import { getIssue } from "../../api/issue"
import AddCommentModal from "../comment/AddCommentModal"

const IssueShow = (props) => {

    const {user,msgAlert} = props
    const params = useParams()
    const {issueId} = params
    const [issue,setIssue] = useState(null)
    const [modalOpen,setModalOpen] = useState(false)
    const [refresh,setRefresh] = useState(false)

    useEffect(()=> {
        setRefresh(false)
        fetchIssue()
        
    },[refresh])

    //function used in useEffect to fetch issue info
    const fetchIssue = async () => {
        let apiResp = await getIssue(user,issueId)
        setIssue(apiResp.data.issue)
        console.log('apiresp',apiResp.data.issue)
        // {
        //     "_id": "629137e4a0d8708476672030",
        //     "title": "issue with issueee",
        //     "priority": "major",
        //     "status": "open",
        //     "team": [
        //         {
        //             "_id": "628c44b5a99f9e4e7bb59d6c",
        //             "email": "z@z.z",
        //             "hashedPassword": "$2b$10$F32mBIzuVzMaakY0/44vu.s8y6e/zLNw.WEGmZp.pDxTwBLrwcqTC",
        //             "organization": "demo",
        //             "firstName": "Justin",
        //             "lastName": "Waddle",
        //             "role": "fsdev",
        //             "createdAt": "2022-05-24T02:36:37.904Z",
        //             "updatedAt": "2022-05-27T20:42:16.321Z",
        //             "__v": 0,
        //             "token": "d36b4f766348a285a36cf135bcd86b59"
        //         }
        //     ],
        //     "project": "628fc14ea8ca671a8af549b5",
        //     "owner": "628c44b5a99f9e4e7bb59d6c",
        //     "comments": [],
        //     "createdAt": "2022-05-27T20:43:16.223Z",
        //     "updatedAt": "2022-05-27T20:43:16.231Z",
        //     "__v": 1
        // }
    }

    if (!issue) {
        return (
            <p>Loading..</p>
        )
    }


	return (
        <>
        <h1>Project: {issue.project.title}</h1>
        <div className="issueinfo-container">
            <h4>Status: {issue.status}</h4>
            <h4>Priority: {issue.priority}</h4>
            <h4>Created: {issue.createdAt}</h4>
            <h4>Owner: {issue.owner.firstName} {issue.owner.lastName}</h4>
            <h4>Team: </h4>
            <Button>Update Issue</Button>
        </div>
        <div className="issuedescr-container">
            <h4>Issue Description:</h4>
            <p>{issue.description}</p>
            <div>
                <h5>Comments: </h5>
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
				refresh={refresh}
				handleClose={() => {
					setModalOpen(false)
				}}
			/>

        </>
	)
}

export default IssueShow
