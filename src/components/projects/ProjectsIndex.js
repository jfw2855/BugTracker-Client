import { showProjects } from "../../api/project"
import { useEffect,useState } from "react"
import { Spinner, ListGroup } from 'react-bootstrap'
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
                <Link
                    className="link-style"
                    to={`/project/${item._id}`}
                    state={{title:`${item.title}`,description:`${item.description}`,owner:`${item.owner}`}}
                >
                    <ListGroup.Item
                        action
                        key={`project${index}`}
                        style={{textAlign:'center'}}
                        
                        >
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
