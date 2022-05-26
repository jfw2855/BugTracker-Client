import apiUrl from '../apiConfig'
import axios from 'axios'


// POST -> creates project



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

// show project

// update project

// delete project
