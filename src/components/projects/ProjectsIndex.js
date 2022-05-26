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

    const fetchData = async () => {
        const response = await showProjects(user)
        setProject(response.data.projects)
        console.log('response from fetchdata',response.data)
    }


    if (!project) {
        return<Spinner animation="border" role="status">
        <span className="visually-hidden">Loading</span>
      </Spinner>
    } 
    else {
        projectDetails = project.map((i) => {
            <ListGroup.Item>
                <Row>
                    <Col>{i}</Col>
                </Row>

            </ListGroup.Item>
                                    


        })
    }
    //reponse from db for showProjects 
    //0: {_id: '628eaa62a602b66988d8f4a6', title: 'te3t', description: 'th3n!!!', organization: 'demo', owner: '628c44b5a99f9e4e7bb59d6c', …}



	

	return (
		<>
			<h2>Projects</h2>
            <div>{projectDetails}</div>

		</>
	)
}

export default ProjectsIndex
