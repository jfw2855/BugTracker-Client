import { ListGroup, Row, Col } from "react-bootstrap"
import ReactTimeAgo from "react-time-ago"




const CommentDetails = (props) => {
    
    
   
    const {comments} = props

    
    // body: "comment on issue test"
    // createdAt: "2022-06-11T19:07:31.197Z"
    // owner: {_id: '628c44b5a99f9e4e7bb59d6c', email: 'z@z.z', hashedPassword: '$2b$10$F32mBIzuVzMaakY0/44vu.s8y6e/zLNw.WEGmZp.pDxTwBLrwcqTC', organization: 'demo', firstName: 'Justin', …}
    // updatedAt: "2022-06-11T19:07:31.197Z"
    // _id: "62a4e7f3b6c89d2e07471367"

    if (comments.length === 0 ) {
        return <ListGroup.Item>No Comments</ListGroup.Item>
        
    }

    let commentDetails = comments.map((comment)=> {
        return(
            <ListGroup.Item key={`comId-${comment._id}`}>
                <Row>
                    <Col>
                        {comment.owner.firstName} {comment.owner.lastName}
                        , {comment.owner.role}
                    </Col>
                    <Col>{comment.createdAt===comment.updatedAt?
                        <ReactTimeAgo date={comment.createdAt} local="en-US"/>
                        :
                        <ReactTimeAgo date={comment.updatedAt} local="en-US"/>
                        }
                        {comment.createdAt===comment.updatedAt?
                        "":" (Edited)"
                        }
                    </Col>
                </Row>
                {comment.body}
                <Row>

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
