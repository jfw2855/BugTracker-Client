import {GoIssueOpened} from 'react-icons/go'
import {FaCheck} from 'react-icons/fa'

const StatData = (props) => {

    const {issuesData,projects,user} = props

    let [open,closed] = Array(2).fill(0)

    for (let i in issuesData) {
        issuesData[i].status=="open"?open+=1:closed+=1
    }

    console.log('from statdata',issuesData,projects)

	return (
		<div className="stat-metrics noselect"> 
            <div className="stat-project">Total {user.organization.toUpperCase()} Projects: {projects.length}</div>
            <div className="stat-issue-container">
                <div className="stat-detail open-stat">
                    <GoIssueOpened className="issue-icon"/>
                    Open Issues: {open}
                    </div>
                <div className="stat-detail close-stat">
                    <FaCheck className="issue-icon"/>
                    Closed Issues: {closed}
                    </div>
            </div>
		</div>
	)
}

export default StatData
