import apiUrl from '../apiConfig'
import axios from 'axios'


//create issue


//show issues

//GET user issues -> displays all issues user created 
export const showMyIssues = (user) => {

    const config = {
      method: 'GET',
      url: `${apiUrl}/user/issues`,
      headers: {
          Authorization: `Token token=${user.token}`
      }
    }
    return axios(config)
  }

// show individual issue

// update issue

// delete issue
