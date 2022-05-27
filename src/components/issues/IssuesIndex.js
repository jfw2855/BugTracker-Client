import { useEffect,useState } from "react"
import { Spinner, ListGroup, Row, Col } from 'react-bootstrap'
import { showMyIssues } from "../../api/issue"



const IssuesIndex = (props) => {

    const {user} = props
    
    useEffect(()=> {
        fetchData()
    })

    const fetchData = async () => {
        let issuesResp = await showMyIssues(user)
        console.log('this is the issue resp!!',issuesResp.data)
    }

	return (
		<> 
		</>
	)
}

export default IssuesIndex
