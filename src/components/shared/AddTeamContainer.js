import React from 'react';
import Select from 'react-select'
import { useEffect,useState } from 'react';
import { getOrgUsers } from '../../api/auth';


const AddTeamContainer = ({issue,user}) => {
    console.log('this is issue!',issue)
    const [options,setOptions] = useState('none')
    // const [allUsers,setAllUsers] = useState(null)

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
        return "loading"
    }




	return (<>
        <form>
        <Select options={options} isMulti/>
        <button type="submit">
            Add Members
        </button>
        </form>
        </>
	)
}

export default AddTeamContainer

