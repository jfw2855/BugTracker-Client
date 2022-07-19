import React, { useState, useEffect } from 'react'
import { ListGroupItem, Row, Col, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

const IssueDetails = (props) => {

    const {issues} = props
    const [sortState,setSortState] = useState("status")
    const [sort,setSort] = useState(false)
    let items

    useEffect(()=> {
        sortIssues()
        setSort(false)
    },[sort])

    const sortIssues = () => {
        if (sortState==="status") {
            issues.sort(function(a,b){
                if (a.status > b.status) return -1
                else if (b.status > a.status) return 1
                else return 0
            })
        }
        else {
            issues.sort(function(a,b){
                if (a.status > b.status) return 1
                else if (b.status > a.status) return -1
                else return 0
            })
        }

    }

    

    
    sortIssues()
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
                    setSortState('status')
                    setSort(true)
                }}>Status</Col>
                <Col
                sm={2}
                className="issue-details issuedet-header"
                onClick={()=>{
                    setSortState('priority')
                    setSort(true)
                }}
                    >Priority</Col>
                <Col className="issue-details issuedet-header" md={6}>Issue Description</Col>
                <Col className="issue-details issuedet-header">Comments</Col>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Row>
        </ListGroupItem>
        <ListGroup className="issues-listgroup">
            {items}
        </ListGroup>
        </>
	)
}

export default IssueDetails