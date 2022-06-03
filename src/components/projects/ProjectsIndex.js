import { showProjects } from "../../api/project"
import { useEffect,useState } from "react"
import { Spinner, ListGroup, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom"



const ProjectsIndex = (props) => {
    const {user,refresh} = props
    const [project,setProject] = useState(null)

    let projectDetails

    useEffect(()=> {
        fetchData()
    },[refresh])

    //fetchData function -> fetches data from the db
    const fetchData = async () => {
        const response = await showProjects(user)
        console.log('this is projects in fetchdata',response.data.projects)
        setProject(response.data.projects)
    }

    //shows spinner while awaiting for api resp
    if (!project) {
        return<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
      </Spinner>
    }
    //maps through projects arr to render project data
    else {
        projectDetails = project.map((item,index) => {
            return (
                <Link to={`/project/${item._id}`}>
                    <ListGroup.Item key={`project${index}`}>
                        {item.title}
                    </ListGroup.Item>
                </Link>
            )


        })
    }
 

	return (
		<> 
            {projectDetails}
		</>
	)
}

export default ProjectsIndex
