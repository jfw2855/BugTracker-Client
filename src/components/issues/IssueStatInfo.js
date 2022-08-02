import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Card } from "react-bootstrap"
import {AiOutlineProject} from "react-icons/ai"
import {MdPersonAddAlt1} from "react-icons/md"
import { getOrgUsers } from "../../api/auth"
import AddTeamContainer from "../shared/AddTeamContainer"

const IssueStatInfo = ({user,issue,openDate,closeDate,handleStatus,refresh}) => {

    const navigate = useNavigate()
    const [addTeamOpen,setAddTeamOpen] = useState("hide")


    //maps over issue team to render members
    let issueTeam = issue.team.map((person => {
        return <h6 className={person._id===issue.owner._id?"hide":""}>{`${person.firstName} ${person.lastName}`}</h6>
    }))

    const handleClick = () => {
        addTeamOpen==="hide"?setAddTeamOpen("show"):setAddTeamOpen("hide")
    }

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
                    onClick={handleClick}
                />
                </h5>
                <h6>{issue.owner.firstName} {issue.owner.lastName}</h6>
                {issueTeam}
                <AddTeamContainer
                    issue={issue}
                    user={user}
                    show={addTeamOpen}
                    hide={()=>setAddTeamOpen("hide")}
                />

            </Card.Body>
        </Card>
        </>

	)
}

export default IssueStatInfo
