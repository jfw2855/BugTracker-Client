import { ListGroup, Row, Col, Button } from "react-bootstrap"
import TimeAgo from "javascript-time-ago"
import ReactTimeAgo from "react-time-ago"
import React from "react"
import en from 'javascript-time-ago/locale/en.json'
import { FiEdit3 } from "react-icons/fi"
import {RiDeleteBack2Fill} from "react-icons/ri"
import { deleteComment } from "../../api/comment"





const CommentDetails = (props) => {
   
    TimeAgo.addLocale(en)

    const {comments,user,issueId,refresh} = props

    
    // body: "comment on issue test"
    // createdAt: "2022-06-11T19:07:31.197Z"
    // owner: {_id: '628c44b5a99f9e4e7bb59d6c', email: 'z@z.z', hashedPassword: '$2b$10$F32mBIzuVzMaakY0/44vu.s8y6e/zLNw.WEGmZp.pDxTwBLrwcqTC', organization: 'demo', firstName: 'Justin', …}
    // updatedAt: "2022-06-11T19:07:31.197Z"
    // _id: "62a4e7f3b6c89d2e07471367"

    if (comments.length === 0 ) {
        return <ListGroup.Item>No Comments</ListGroup.Item>
    }

    //handle delete function to remove commnet
    const handleDelete = async (e,commId) => {
        e.preventDefault()
        await deleteComment(user,issueId,commId)
        refresh()
    }

    let commentDetails = comments.map((comment)=> {
        return(
            <ListGroup.Item key={`comId-${comment._id}`}>
                <Row>
                    <Col>
                        {comment.owner.firstName} {comment.owner.lastName}
                        , {
                            comment.owner.role=="be"?"Backend Engineer":comment.owner.role=="ds"?
                            "Data Scientist":comment.owner.role=="fe"?"Frontend Engineer":comment.owner.role=="intern"?
                            "Intern":comment.owner.role=="pm"?"Project Manger":comment.owner.role=="tl"?"Tech Lead":"Fullstack Engineer"
                        }
                    </Col>
                    <Col>{comment.createdAt===comment.updatedAt?
                        <ReactTimeAgo date={new Date(comment.createdAt)} local="en-US"/>
                        :
                        <ReactTimeAgo date={new Date(comment.updatedAt)} local="en-US"/>
                        }
                        {comment.createdAt===comment.updatedAt?
                        "":" (Edited)"
                        }
                    </Col>
                    <Col>
                    {comment.owner._id===user._id?
                    <>
                        <FiEdit3  />
                        <RiDeleteBack2Fill onClick={(e)=>handleDelete(e,comment._id)}/>
                    </>
                    :<></>}
                    </Col>
                </Row>
  
                <Row>
                    {comment.body}
                </Row>
            </ListGroup.Item>
        )
    })



	return (
        <>
            {commentDetails}

        </>
	)
}

export default CommentDetails
