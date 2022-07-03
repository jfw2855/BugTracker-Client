import { ListGroupItem, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const IssueDetails = (props) => {

    const {issues} = props

    //maps issues to create list group items of issues
    let items = issues.map((issue)=>{
        return(
        <>
        <Link
            className="link-style"
            to={`/issue/${issue._id}`}>
            <ListGroupItem key={`issueKey${issue._id}`}>
                <Row>
                    <Col
                    className="issue-details"
                    style={{backgroundColor: issue.status==='open'?'lightgreen':'lightgrey'}}
                    >
                        {issue.status}
                    </Col>
                    <Col
                    className="issue-details"
                    style = {{
                        'backgroundColor': issue.priority === 'low' ?
                        'lightyellow' : issue.priority === 'medium' ?
                        'yellow' : issue.priority === 'high'? 'orange':'red'
                    }}
                    >
                        {issue.priority}
                    </Col>
                    <Col className="issue-details">{issue.title}</Col>
                    <Col className="issue-details">{issue.comments.length}</Col>
                </Row>
            </ListGroupItem>
        </Link>
        </>
        )
    })



	return (
        <>
        {items}
        </>
	)
}

export default IssueDetails