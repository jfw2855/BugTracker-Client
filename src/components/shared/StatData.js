import {GoIssueOpened} from 'react-icons/go'
import {FaCheck} from 'react-icons/fa'
import {BsFillFileEarmarkBarGraphFill} from 'react-icons/bs'

const StatData = (props) => {

    const {issuesData,projects,user} = props

    let [open,closed] = Array(2).fill(0)

    for (let i in issuesData) {
        issuesData[i].status==="open"?open+=1:closed+=1
    }


	return (
		<div className="issue-stat-container"> 
            <div className="stat-detail total-stat">
                <BsFillFileEarmarkBarGraphFill className="issue-icon"/>
                <span>Total Issues</span>
                <span>{open+closed}</span>
                
            </div>
            <div className="stat-detail open-stat">
                <GoIssueOpened className="issue-icon"/>
                <span>Open Issues</span>
                <span>{open}</span>
            </div>
            <div className="stat-detail close-stat">
                <FaCheck className="issue-icon"/>
                <span>Closed Issues</span>
                <span>{closed}</span>
            </div>
		</div>
	)
}

export default StatData
