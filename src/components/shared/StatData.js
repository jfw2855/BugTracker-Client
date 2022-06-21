
const StatData = (props) => {

    const {issuesData,projects,user} = props

    let [open,closed] = Array(2).fill(0)

    for (let i in issuesData) {
        issuesData[i].status=="open"?open+=1:closed+=1
    }

    console.log('from statdata',issuesData,projects)

	return (
		<div className="stat-container"> 
            <div className="stat-project">Total {user.organization.toUpperCase()} Projects: {projects.length}</div>
            <div className="stat-issue-container">
                <div className="stat-detail open-stat">Open Issues: {open}</div>
                <div className="stat-detail close-stat">Closed Issues: {closed}</div>
            </div>
		</div>
	)
}

export default StatData
