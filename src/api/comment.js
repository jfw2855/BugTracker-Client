import apiUrl from '../apiConfig'
import axios from 'axios'


//POST -> create comment
export const createComment = (user,issueId,comment) => {

    const config = {
      method: 'POST',
      url: `${apiUrl}/comment/issue/${issueId}`,
      headers: {
        Authorization: `Token token=${user.token}`
      },
      data: {comment}
    }
    return axios(config)
  }


//PATCH
//DELETE
