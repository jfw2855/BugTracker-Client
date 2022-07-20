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
                        className="item-hover"
                        key={`lg-${index}`}>
                            <Row>

                                <Col sm={2}>
                                    <span
                                        className={item.status==="open"?"open":"closed"}
                                    >
                                        {item.status}</span>&nbsp;&nbsp;
                                </Col>
                                <Col sm={2}>
                                    <span
                                        className={item.priority=="low"?"low":item.priority=="medium"?
                                        "medium":item.priority=="high"?"high":"critical"}
                                    >
                                        {item.priority}</span>&nbsp;&nbsp;
                                </Col>
                                <Col>
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
            {issueDetails}
		</>
	)
}

export default IssuesIndex
