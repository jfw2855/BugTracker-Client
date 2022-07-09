import { ListGroup, Row, Col } from "react-bootstrap"
import TimeAgo from "javascript-time-ago"
import ReactTimeAgo from "react-time-ago"
import {React,useState} from "react"
import en from 'javascript-time-ago/locale/en.json'
import { FiEdit3 } from "react-icons/fi"
import {RiDeleteBack2Fill} from "react-icons/ri"
import { deleteComment } from "../../api/comment"
import EditCommentModal from "./EditCommentModal"


const CommentDetails = (props) => {
   
    TimeAgo.addLocale(en)

    const {comments,user,issueId,refresh} = props
    const [editOpen,setEditOpen] = useState(false)
    const [commentId,setCommentId] = useState(null)
    const [body,setBody] = useState(null)

    //renders if no comments exist
    if (comments.length === 0 ) {
        return <ListGroup.Item>No Comments</ListGroup.Item>
    }

    //handle delete function to remove commnet
    const handleDelete = async (e,commId) => {
        e.preventDefault()
        await deleteComment(user,issueId,commId)
        refresh()
    }
    
    //renders all comments into list groups
    let commentDetails = comments.map((comment)=> {
        return(
            <ListGroup.Item  key={`comId-${comment._id}`}>
                <Row className="comment-owner-details">
                    <Col style={{color:'rgb(61, 89, 120)'}}>
                        {comment.owner.firstName} {comment.owner.lastName}
                        , {
                            comment.owner.role=="be"?"Backend Engineer":comment.owner.role==="ds"?
                            "Data Scientist":comment.owner.role==="fe"?"Frontend Engineer":comment.owner.role==="intern"?
                            "Intern":comment.owner.role==="pm"?"Project Manger":comment.owner.role==="tl"?"Tech Lead":"Fullstack Engineer"
                        }
                        &nbsp;&nbsp;&nbsp;
                        {comment.createdAt===comment.updatedAt?
                        <ReactTimeAgo date={new Date(comment.createdAt)} local="en-US"/>
                        :
                        <ReactTimeAgo date={new Date(comment.updatedAt)} local="en-US"/>
                        }
                        {comment.createdAt===comment.updatedAt?
                        "":" (Edited)"
                        }
                    </Col>
                    <Col lg={1}>
                    {comment.owner._id===user._id?
                    <>
                        <FiEdit3
                            type="button"
                            className="edit"
                            onClick={(e)=>{
                            setCommentId(comment._id)
                            setBody(comment.body)
                            setEditOpen(true)
                        }}/>
                        <RiDeleteBack2Fill
                            type="button"
                            className="delete"
                            onClick={(e)=>handleDelete(e,comment._id)}/>
                    </>
                    :<></>}
                    </Col>
                </Row>
  
                <Row>
                    <Col>
                        {comment.body}
                    </Col>
                </Row>
            </ListGroup.Item>
        )
    })

	return (
        <>
            {commentDetails}
            <EditCommentModal
				show={editOpen}
				user={user}
				issueId={issueId}
                commentId={commentId}
				refreshComments={refresh}
                body={body}
				handleClose={() => {
					setEditOpen(false)
				}}
			/>
        </>
	)
}

export default CommentDetails
