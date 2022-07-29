import { useNavigate } from "react-router-dom"
import { Card } from "react-bootstrap"
import {AiOutlineProject} from "react-icons/ai"

const IssueStatInfo = ({issue,openDate,closeDate,handleStatus}) => {

    const navigate = useNavigate()

	return (
        <Card className="issueinfo-container">
            <Card.Header className="stat-container">
                <h4>Status:&nbsp;
                    <button
                    className={issue.status}
                    onClick={handleStatus}
                    >
                        {issue.status}
                    </button>
                </h4>
                <h4>Priority:&nbsp;
                    <span
                    className={issue.priority}
                    >
                        {issue.priority}
                    </span>
                </h4>
            </Card.Header>
            <Card.Body>
                <div className="project">
                    <span >Project: {issue.project.title}</span>
                    <AiOutlineProject
                        className="project-icon"
                        type="button"
                        onClick={()=>navigate(`/project/${issue.project._id}`)} 
                    />
                </div>
                <hr/>
                <i>Created:</i>
                <h6>{openDate} by {issue.owner.firstName} {issue.owner.lastName}</h6>
                {issue.status==="open"?
                <></>:
                <>
                <i>Closed:</i>
                <h6>{closeDate}</h6>
                </>}
            </Card.Body>
        </Card>

	)
}

export default IssueStatInfo
