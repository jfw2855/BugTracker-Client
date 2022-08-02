import React from 'react';
import Select from 'react-select'
import { useEffect,useState } from 'react';
import { getOrgUsers } from '../../api/auth';
import { updateIssue } from '../../api/issue';


const AddTeamContainer = ({issue,user,show,hide}) => {
    console.log('this is issue!',issue)
    const [options,setOptions] = useState('none')
    // const [allUsers,setAllUsers] = useState(null)
    const [selectedTeam,setSelectedTeam] = useState(null)

    let selectOptions = []

    useEffect(()=> {
        generateOptions()
    },[])
    
    
    const generateOptions =  async () => {

        let fetchData = await getOrgUsers(user)
        let allUsers = fetchData.data.orgMembers
        
        let issueTeamObj = {}
        for (let i in issue.team) {
            let person = issue.team[i]
            issueTeamObj[person._id]=1
        }
        let tempUsers = allUsers
        for (let i in tempUsers) {
            let curUser = tempUsers[i]
            let name = `${curUser.firstName} ${curUser.lastName}`
            let id = tempUsers[i]._id
            if (id in issueTeamObj) {
                continue
            } else {
                selectOptions.push({value:curUser,label:name})
            }
        }
        console.log('this my options',selectOptions)
        setOptions(selectOptions)
        
    }


    if (options==="none") {
        return <span className={show}>Loading...</span>
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        for (let i in selectedTeam) {
            issue.team.push(selectedTeam[i].value)
        }
        updateIssue(user,issue._id,issue)
        hide()
        

    }

    const handleChange = (selectedTeam) => {
        setSelectedTeam(selectedTeam)
    }




	return (
        
        <form className={show}>
        <Select options={options} onChange={handleChange} isMulti className='select-team'/>
        <button type="submit" onClick={handleSubmit} className="add-team-btn">
            Add Members
        </button>
        </form>
	)
}

export default AddTeamContainer

