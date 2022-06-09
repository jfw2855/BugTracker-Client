import apiUrl from '../apiConfig'
import axios from 'axios'


// POST -> creates project
export const createProject = (user,project) => {

    const config = {
      method: 'POST',
      url: `${apiUrl}/project`,
      headers: {
        Authorization: `Token token=${user.token}`
      },
      data: {project}
    }
    return axios(config)
  }


// GET -> index projects
export const showProjects = (user) => {

    const config = {
      method: 'GET',
      url: `${apiUrl}/project`,
      headers: {
          Authorization: `Token token=${user.token}`
      }
    }
    return axios(config)
  }

//GET one -> gets single project
export const getProject = (user,projectId) => {

  const config = {
    method: 'GET',
    url: `${apiUrl}/project/${projectId}`,
    headers: {
        Authorization: `Token token=${user.token}`
    }
  }
  return axios(config)
}


// PATCH -> updates project info
export const updateProject = (user,project,projectId) => {

  const config = {
    method: 'POST',
    url: `${apiUrl}/project/${projectId}`,
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {project}
  }
  return axios(config)
}


// DELETE -> removes project from DB
export const removeProject = (user,projectId) => {

  const config = {
    method: 'DELETE',
    url: `${apiUrl}/project/${projectId}`,
    headers: {
        Authorization: `Token token=${user.token}`
    }
  }
  return axios(config)
}

