import ProjectsIndex from "./projects/ProjectsIndex"

const Home = (props) => {
	const { msgAlert, user } = props

	return (
		<>
			<h2>Home Page</h2>
			<ProjectsIndex user={user}/>
		</>
	)
}

export default Home
