import React, { useState } from 'react'
import { ListGroupItem, Row, Col, ListGroup } from "react-bootstrap"
import { BsPrefixComponent } from 'react-bootstrap/esm/helpers'
import { Link } from "react-router-dom"

const IssueDetails = ({issues}) => {

    const [sortState,setSortState] = useState("open")
    let items

    //sorts issues based on if they are open or closed
    const sortIssues = () => {
        if (sortState==="open") {
            issues.sort((a, b) => {
                if (a.status > b.status) return -1
                else if (b.status > a.status) return 1
                else return 0
            })
            setSortState("closed")
        }
        else {
            issues.sort((a, b) => {
                if (a.status > b.status) return 1
                else if (b.status > a.status) return -1
                else return 0
            })
            setSortState("open")
        }

    }

    
    //maps issues to create list group items of issues
    if (issues.length>0) {
        items = issues.map((issue)=>{
            return(
            <>
            <Link
                className="link-style"
                to={`/issue/${issue._id}`}>
                <ListGroupItem key={`issueKey${issue._id}`} className="issue-item">
                    <Row>
                        <Col
                        className="issue-details"
                        sm={2}
                        >
                            <span className={issue.status}>
                                {issue.status}
                            </span>
                        </Col>
                        <Col
                        className="issue-details"
                        sm={2}
                        >
                            <span className={issue.priority}>
                                {issue.priority}
                            </span>
                        </Col>
                        <Col className="issue-details overflow" md={6}>{issue.title}</Col>
                        <Col className="issue-details">{issue.comments.length}</Col>
                    </Row>
                </ListGroupItem>
            </Link>
            </>
            )
        })
    }
    //renders if no issues exist
    else {
        items =
        <ListGroupItem>
        <Row>
            <i>No Issues Created For Project</i>
        </Row>
    </ListGroupItem>
    }


	return (
        <>
        <ListGroupItem style={{width:'60%'}}>
            <Row>
                <Col
                sm={2}
                className="issue-details issuedet-header"
                onClick={()=>{
                    sortIssues()
                }}>Status</Col>
                <Col
                sm={2}
                className="issue-details issuedet-header"
                onClick={()=>{
                    sortIssues()
                }}
                    >Priority</Col>
                <Col className="issue-details issuedet-header" md={6}>Issue Description</Col>
                &nbsp;
                <Col className="issue-details issuedet-header">Comments</Col>
                
            </Row>
        </ListGroupItem>
        <ListGroup className="issues-listgroup">
            {items}
        </ListGroup>
        {sortIssues}
        </>
	)
}

export default IssueDetails