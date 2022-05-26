import { showProjects } from "../../api/project"
import { useEffect,useState } from "react"
import { Spinner, ListGroup, Row, Col } from 'react-bootstrap'



const ProjectsIndex = (props) => {
    const {user} = props
    const [project,setProject] = useState(null)

    let projectDetails

    useEffect(()=> {
        fetchData()
    },[])

    //fetchData fxn -> fetches data from the db
    const fetchData = async () => {
        const response = await showProjects(user)
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
                <ListGroup.Item key={`project${index}`}>
                    {item.title}
                </ListGroup.Item>
            )

        })
    }
 

	return (
		<> 
            <ListGroup.Item style={{color:'black',fontWeight:'bold',fontSize:'20px'}}>Projects</ListGroup.Item>
            {projectDetails}
		</>
	)
}

export default ProjectsIndex
