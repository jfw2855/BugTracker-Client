import ProjectsIndex from "./projects/ProjectsIndex"
import { ListGroup } from "react-bootstrap"

const Home = (props) => {
	const { msgAlert, user } = props

	return (
		<>
			<h2>Home Page</h2>
			<div style={{border:'1px solid red'}}>
                <ListGroup style={{border:'2px dashed purple',width:'30%'}}>
					<ProjectsIndex user={user}/>
                </ListGroup>
			</div>
		</>
	)
}

export default Home
