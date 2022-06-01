import ProjectsIndex from "./projects/ProjectsIndex"
import IssuesIndex from "./issues/IssuesIndex"
import { Button, ButtonGroup, ListGroup,Spinner } from "react-bootstrap"
import { useEffect, useState } from "react"
import ProjectNewModal from "./projects/ProjectNewModal"
import IssueNewModal from "./issues/IssueNewModal"
import { createProject } from "../api/project"
import { showProjects } from "../api/project"

const Home = (props) => {
	const { msgAlert, user } = props
	const [projectOpen,setProjectOpen] = useState(false)
	const [issueOpen,setIssueOpen] = useState(false)
	const [projectRefresh,setProjectRefresh] = useState(false)
	const [issueRefresh,setIssueRefresh] = useState(false)
	const [projOptions,setProjOptions] = useState(null)

	//resets the refresh state variable & calls for proj info
	useEffect(() => {
		setIssueRefresh(false)
		setProjectRefresh(false)
		fetchProj()

	},[projectRefresh,issueRefresh])

	//fetches project name & ids to render as options for new issue modal
	const fetchProj = async () => {
		let apiResp = await showProjects(user)
		let temp = apiResp.data.projects.map((item)=> {
			return (
				<option key={`pOpt${item._id}`} value={item._id}>{item.title}</option>
				)
			})
		setProjOptions(temp)
	}

	//renders spinner until api responds
	if (!projOptions) {
        return<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
      </Spinner>
    }

	
	//handle function to open New Project Modal
	const handleNewProject = () => {
		setProjectOpen(true)
	}

	//handle function to open New Issue Modal
	const handleNewIssue = () => {
		setIssueOpen(true)
	}

	//rerenders project index once a new project is created
	const refreshProjects = () => {
		setProjectRefresh(true)
	}

	//rerenders issues index once a new issue is created
	const refreshIssues = () => {
		setIssueRefresh(true)
	}

	return (
		<>
			<h2>Home Page</h2>
			<div style={{border:'1px solid red',display:'flex',justifyContent:'space-between'}}>
                <ListGroup style={{border:'2px dashed purple',width:'30%'}}>
					<ProjectsIndex user={user} refresh={projectRefresh}/>
                </ListGroup>
				<ListGroup style={{border:'2px dashed purple',width:'30%'}}>
					<IssuesIndex user={user} refresh={issueRefresh}/>
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
				refreshProjects={refreshProjects}
				handleClose={() => {
					setProjectOpen(false)
				}}
			/>
			<IssueNewModal
				show={issueOpen}
				user={user}
				msgAlert={msgAlert}
				options={projOptions}
				refreshIssues={refreshIssues}
				handleClose={() => {
					setIssueOpen(false)
				}}
			/>
		</>
	)
}

export default Home
