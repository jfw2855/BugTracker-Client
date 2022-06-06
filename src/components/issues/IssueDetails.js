import { ListGroupItem, Row, Col } from "react-bootstrap"


const IssueDetails = (props) => {

    const {issues} = props

    //maps issues to create list group items of issues
    let items = issues.map((issue)=>{
        return(
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
        )
    })



	return (
        <>
        {items}
        </>
	)
}

export default IssueDetails
