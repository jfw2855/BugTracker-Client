import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import {AiOutlineProject} from "react-icons/ai"
import {MdPersonAddAlt1} from "react-icons/md"
import { getOrgUsers } from "../../api/auth"
import AddTeamContainer from "../shared/AddTeamContainer"

const IssueStatInfo = ({user,issue,openDate,closeDate,handleStatus,refresh}) => {

    const navigate = useNavigate()

    const [addTeamOpen,setAddTeamOpen] = useState(false)


    let issueTeam = issue.team.map((person => {
        return <h6></h6>
    }))

	return (
        <>
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
            <Card.Body>
                <h5>Issue Team: &nbsp;
                    <MdPersonAddAlt1
                    className="project-icon"
                    type="button"
                    onClick={()=>setAddTeamOpen(true)}
                
                />
                </h5>
                <h6>{issue.owner.firstName} {issue.owner.lastName}</h6>
                {issueTeam}
                <AddTeamContainer issue={issue} user={user}/>

            </Card.Body>
        </Card>
        </>

	)
}

export default IssueStatInfo
