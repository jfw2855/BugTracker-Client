import ProjectsIndex from "./projects/ProjectsIndex"
import IssuesIndex from "./issues/IssuesIndex"
import { Button, ButtonGroup, ListGroup } from "react-bootstrap"
import { useState } from "react"
import ProjectNewModal from "./projects/ProjectNewModal"
import { createProject } from "../api/project"

const Home = (props) => {
	const { msgAlert, user } = props
	const [projectOpen,setProjectOpen] = useState(false)
	const [issueOpen,setIssueOpen] = useState(false)
	
	//handle function to open New Project Modal
	const handleNewProject = () => {
		setProjectOpen(true)
	}

	//handle function to open New Issue Modal
	const handleNewIssue = () => {
		setIssueOpen(true)
	}

	return (
		<>
			<h2>Home Page</h2>
			<div style={{border:'1px solid red',display:'flex',justifyContent:'space-between'}}>
                <ListGroup style={{border:'2px dashed purple',width:'30%'}}>
					<ProjectsIndex user={user}/>
                </ListGroup>
				<ListGroup style={{border:'2px dashed purple',width:'30%'}}>
					<IssuesIndex user={user}/>
                </ListGroup>
			</div>
			<ButtonGroup className="home-btn-container">
				<Button onClick={handleNewProject}>
					Create New Project
				</Button>
				<Button onClick={handleNewIssue}>
					Create New Issue
				</Button>
			</ButtonGroup>
			<ProjectNewModal
				show={projectOpen}
				user={user}
				msgAlert={msgAlert}
				createProject={createProject}
				handleClose={() => {
					setProjectOpen(false)
				}}
			/>  
		</>
	)
}

export default Home
