import ProjectsIndex from "./projects/ProjectsIndex"
import IssuesIndex from "./issues/IssuesIndex"
import { ListGroup } from "react-bootstrap"

const Home = (props) => {
	const { msgAlert, user } = props

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
		</>
	)
}

export default Home
