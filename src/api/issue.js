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

// GET single issue -> shows individual issue
export const getIssue = (user,issueId) => {

  const config = {
    method: 'GET',
    url: `${apiUrl}/issue/${issueId}`,
    headers: {
      Authorization: `Token token=${user.token}`
    }
  }
  return axios(config)
}

// PATCH -> updates issue
export const updateIssue = (user,issueId,issue) => {
  const config = {
    method: 'PATCH',
    url: `${apiUrl}/issue/${issueId}`,
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data:{issue}
  }
  return axios(config)
}

// delete issue

//DELETE ALL -> removes all issues from a project
export const removeAllIssues = (user,projectId) => {

  const config = {
    method: 'DELETE',
    url: `${apiUrl}/issue/project/${projectId}`,
    headers: {
      Authorization: `Token token=${user.token}`
    }
  }
  return axios(config)
}

