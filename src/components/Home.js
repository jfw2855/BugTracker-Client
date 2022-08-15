import ProjectsIndex from "./projects/ProjectsIndex"
import IssuesIndex from "./issues/IssuesIndex"
import {ListGroup,Spinner, Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import ProjectNewModal from "./projects/ProjectNewModal"
import IssueNewModal from "./issues/IssueNewModal"
import { createProject,showProjects } from "../api/project"
import { getOrgIssues, getCloseTime } from "../api/issue"
import OrgIssuePlot from "./issues/OrgIssuePlot"
import StatData from "./shared/StatData"
import {GoReport} from 'react-icons/go'
import {HiFolderAdd} from 'react-icons/hi'

const Home = (props) => {
	const { msgAlert, user } = props
	const [projectOpen,setProjectOpen] = useState(false)
	const [issueOpen,setIssueOpen] = useState(false)
	const [projectRefresh,setProjectRefresh] = useState(false)
	const [issueRefresh,setIssueRefresh] = useState(false)
	const [projOptions,setProjOptions] = useState(null)
	const [issuesData,setIssuesData] = useState(null)
	const [projects,setProjects] = useState(null)
	//avgICT === average issue close time
	const [avgICT, setAvgICT] = useState(0)

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

	//fetches org issues and average issue close time
	const fetchOrgIssues = async() => {
		let apiResp = await getOrgIssues(user)
		setIssuesData(apiResp.data.issues)
		let timeResp = await getCloseTime(user)
		setAvgICT(timeResp.data.avgCloseTime)
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
		<Card className="home-body">
			<Card.Header className="dashboard-header">
				<i>{user.organization.toUpperCase()} Dashboard</i>
				<i>User: {user.firstName} {user.lastName} </i>
			</Card.Header>
			<div className="home-top">
				<div className="home-header">
					<StatData issuesData={issuesData} projects={projects} user={user} avgICT={avgICT}/>
					<OrgIssuePlot data={issuesData}/>
				</div>
				<div className="project-details">
					<div className="home-btn-container">
						<button onClick={handleNewIssue} className="openissue-btn">
							Report Issue &nbsp;<GoReport/>
						</button>
						<button onClick={handleNewProject} className="home-btn">
							Create Project &nbsp;<HiFolderAdd/>
						</button>
					</div>
					<h4>View Projects</h4>
					<ListGroup className="scroll-show">
						<ProjectsIndex user={user} refresh={projectRefresh} className="scroll-show"/>
					</ListGroup>
				</div>
			</div>
			<div className="home-container">
				<div className="home-details">
					<h4>My Created Issues</h4>
					<IssuesIndex user={user} refresh={issueRefresh}/>
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
		</Card>
	)
}

export default Home
