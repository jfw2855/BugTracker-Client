import ProjectsIndex from "./projects/ProjectsIndex"
import IssuesIndex from "./issues/IssuesIndex"
import { Button, ButtonGroup, ListGroup,Spinner } from "react-bootstrap"
import { useEffect, useState } from "react"
import ProjectNewModal from "./projects/ProjectNewModal"
import IssueNewModal from "./issues/IssueNewModal"
import { createProject,showProjects } from "../api/project"
import { getOrgIssues } from "../api/issue"
import OrgIssuePlot from "./issues/OrgIssuePlot"
import StatData from "./shared/StatData"

const Home = (props) => {
	const { msgAlert, user } = props
	const [projectOpen,setProjectOpen] = useState(false)
	const [issueOpen,setIssueOpen] = useState(false)
	const [projectRefresh,setProjectRefresh] = useState(false)
	const [issueRefresh,setIssueRefresh] = useState(false)
	const [projOptions,setProjOptions] = useState(null)
	const [issuesData,setIssuesData] = useState(null)
	const [projects,setProjects] = useState(null)

	//resets the refresh state variable & calls for proj info
	useEffect(() => {
		setIssueRefresh(false)
		setProjectRefresh(false)
		fetchProj()
		fetchOrgIssues()
	},[projectRefresh,issueRefresh])

	//fetches project name & ids to render as options for new issue modal
	const fetchProj = async () => {
		let apiResp = await showProjects(user)
		setProjects(apiResp.data.projects)
		let temp = apiResp.data.projects.map((item)=> {
			return (
				<option key={`pOpt${item._id}`} value={item._id}>{item.title}</option>
				)
			})
		setProjOptions(temp)
	}

	//fetch org issues and assigns array to issueData
	const fetchOrgIssues = async() => {
		let apiResp = await getOrgIssues(user)
		setIssuesData(apiResp.data.issues)
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
			<OrgIssuePlot data={issuesData}/>
			<StatData issuesData={issuesData} projects={projects} user={user}/>
			<h2 >Home Page</h2>
			<div className="home-container">
				<div className="home-details">
					<h4>Projects</h4>
					<ListGroup className="scroll-show">
						<ProjectsIndex user={user} refresh={projectRefresh} className="scroll-show"/>
					</ListGroup>
					<Button onClick={handleNewProject} className="home-btn">
						Create New Project
					</Button>
				</div>
				<div className="home-details">
					<h4>My Issues</h4>
					<ListGroup className="scroll-show">
						<IssuesIndex user={user} refresh={issueRefresh}/>
					</ListGroup>
					<Button onClick={handleNewIssue} className="home-btn">
						Create New Issue
					</Button>
				</div>
			</div>
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
