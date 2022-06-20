
const StatData = (props) => {

    const {issuesData,projects,user} = props

    let [open,closed] = Array(2).fill(0)

    for (let i in issuesData) {
        issuesData[i].status=="open"?open+=1:closed+=1
    }

    console.log('from statdata',issuesData,projects)

	return (
		<>  
            <h3>Total {user.organization.toUpperCase()} Projects: {projects.length}</h3>
            <h3>Open Issues: {open}</h3>
            <h3>Closed Issues: {closed}</h3>
        

		</>
	)
}

export default StatData
