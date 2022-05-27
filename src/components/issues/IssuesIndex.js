import { useEffect,useState } from "react"
import { Spinner, ListGroup, Row, Col } from 'react-bootstrap'
import { showMyIssues } from "../../api/issue"



const IssuesIndex = (props) => {

    const {user} = props
    const [issues,setIssues] = useState(null)

    let issueDetails

    useEffect(()=> {
        fetchData()
    },[])

    //fetchData function -> fetches data from the db
    const fetchData = async () => {
        let issuesResp = await showMyIssues(user)
        setIssues(issuesResp.data.issues)
        console.log('this is the issue resp!!',issuesResp.data.issues)
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
                <ListGroup.Item key={`issues${index}`}>
                    {item.title}
                </ListGroup.Item>
            )

        })
    }

	return (
		<>
            <ListGroup.Item style={{color:'black',fontWeight:'bold',fontSize:'20px'}}>My Issues</ListGroup.Item>
            {issueDetails}
		</>
	)
}

export default IssuesIndex
