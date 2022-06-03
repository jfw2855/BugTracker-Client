import { useLocation,useParams } from "react-router-dom"
import { Button,ListGroup,ListGroupItem,Row,Col } from "react-bootstrap"
import { useEffect,useState } from "react"
import { showProjectIssues } from "../../api/issue"



const ProjectShow = (props) => {

    const {user} = props
    const location = useLocation()
    const {title,description,owner} = location.state






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
