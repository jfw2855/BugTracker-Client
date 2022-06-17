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


//PATCH -> updates comment from issue
export const updateComment = (user,issueId,commentId,comment) => {

  const config = {
    method: 'PATCH',
    url: `${apiUrl}/comment/${issueId}/${commentId}`,
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data:{comment}
  }
  return axios(config)
}


//DELETE -> removes comment from issue
export const deleteComment = (user,issueId,commentId) => {

  const config = {
    method: 'DELETE',
    url: `${apiUrl}/comment/${issueId}/${commentId}`,
    headers: {
      Authorization: `Token token=${user.token}`
    }
  }
  return axios(config)
}
