import { useLocation,useParams } from "react-router-dom"
import { Button,ListGroup,ListGroupItem,Row,Col } from "react-bootstrap"
import { useEffect,useState } from "react"
import { showProjectIssues } from "../../api/issue"



const ProjectShow = (props) => {

    const {user} = props
    const location = useLocation()
    const {title,description,owner} = location.state
    const params = useParams()
    const {projId} = params 


    useEffect(()=>{
        fetchIssues()

        
    })

    //function used in useEffect to fetch all project issues from db
    const fetchIssues =  async () => {
        let apiResp = await showProjectIssues(user,projId)
        console.log('this is issues from apiResp!!!!',apiResp.data.issues)
        
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
                            <Col>Status</Col>
                            <Col>Priority</Col>
                            <Col>Title</Col>
                        </Row>

                    </ListGroupItem>
                </ListGroup>
            </div>
            
		</>
	)
}

export default ProjectShow
