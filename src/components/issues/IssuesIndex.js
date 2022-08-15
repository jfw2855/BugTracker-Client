import { useEffect,useState } from "react"
import { Spinner, ListGroup, Row, Col } from 'react-bootstrap'
import { showMyIssues } from "../../api/issue"
import { Link } from "react-router-dom"



const IssuesIndex = (props) => {

    const {user,refresh} = props
    const [issues,setIssues] = useState(null)

    let issueDetails

    useEffect(()=> {
        fetchData()
    },[refresh])

    //fetchData function -> fetches data from the db
    const fetchData = async () => {
        let issuesResp = await showMyIssues(user)
        setIssues(issuesResp.data.issues)
    }
    
    //shows spinner while awaiting for api resp
    if (!issues) {
        return<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
        </Spinner>
    }
    //maps through issues arr to render issue data
    else {
        issueDetails = issues.map((item,index) => {
            return (
                <Link
                    className="link-style"
                    to={`/issue/${item._id}`}>
                    <ListGroup.Item
                        action
                        key={`lg-${index}`}>
                            <Row>
                                <Col sm={2} style={{textAlign:'center'}}>
                                    {item.project.title}
                                </Col>
                                <Col sm={3} style={{textAlign:'center'}}>
                                    {item._id}
                                </Col>
                                <Col sm={1} style={{textAlign:'center'}}>
                                    <span
                                        className={item.status}
                                    >
                                        {item.status}</span>
                                </Col>
                                <Col sm={1} style={{textAlign:'center'}}>
                                    <span
                                        className={item.priority}
                                    >
                                        {item.priority}</span>
                                </Col>
                                <Col style={{textAlign:'center'}}>
                                    {item.title}
                                </Col>
                            </Row>
                    </ListGroup.Item>
                </Link>
            )

        })
    }

	return (
		<>
        	<ListGroup className="scroll-show">
                <ListGroup.Item className='sticky' key={`issueHomeHeader`}>
                    <Row>
                        <Col sm={2} style={{textAlign:'center',fontWeight:'bold'}}>
                            <span>Project</span>
                        </Col>
                        <Col sm={3} style={{textAlign:'center', fontWeight:'bold'}}>
                            Issue Id
                        </Col>
                        <Col sm={1} style={{textAlign:'center',fontWeight:'bold'}}>
                            <span>Status</span>
                        </Col>
                        <Col sm={1} style={{textAlign:'center',fontWeight:'bold'}}>
                            <span>Priority</span>
                        </Col>
                        <Col style={{textAlign:'center',fontWeight:'bold'}}>
                            Issue Description
                        </Col>
                    </Row>
                    </ListGroup.Item>
                {issueDetails}
			</ListGroup>
		</>
	)
}

export default IssuesIndex
