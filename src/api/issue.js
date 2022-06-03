import apiUrl from '../apiConfig'
import axios from 'axios'


//POST issue -> creates new issue 
export const createIssue = (issue,projectId,user) => {
  
  const config = {
    method: 'POST',
    url: `${apiUrl}/issue/project/${projectId}`,
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {issue}
  }
  return axios(config)
}

//GET project issues -> displays all issues for a project
export const showProjectIssues = (user,projectId) => {

  const config = {
    method: 'GET',
    url: `${apiUrl}/issue/project/${projectId}`,
    headers: {
      Authorization: `Token token=${user.token}`
    }
  }
  return axios(config)
}

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

