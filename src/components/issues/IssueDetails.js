import React, { useState, useEffect } from 'react'
import { ListGroupItem, Row, Col, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

const IssueDetails = (props) => {

    const {issues} = props
    const [sortState,setSortState] = useState("status")
    const [sort,setSort] = useState(false)

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
                    <Col className="issue-details overflow">{issue.title}</Col>
                    <Col className="issue-details">{issue.comments.length}</Col>
                </Row>
            </ListGroupItem>
        </Link>
        </>
        )
    })



	return (
        <>
        <ListGroupItem style={{width:'98%'}}>
            <Row>
                <Col className="issue-details"
                onClick={()=>{
                    setSortState('status')
                    setSort(true)
                }}>Status</Col>
                <Col className="issue-details"
                onClick={()=>{
                    setSortState('priority')
                    setSort(true)
                }}
                    >Priority</Col>
                <Col className="issue-details">Issue</Col>
                <Col className="issue-details">Comments</Col>
            </Row>
        </ListGroupItem>
        <ListGroup className="issues-listgroup">
            {items}
        </ListGroup>
        </>
	)
}

export default IssueDetails