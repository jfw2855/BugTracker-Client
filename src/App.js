import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import ChangePassword from './components/auth/ChangePassword'
import ProjectShow from './components/projects/ProjectShow'
import IssueShow from './components/issues/IssueShow'

const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

  const clearUser = () => {
    setUser(null)
  }

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				<Header user={user} clearUser={clearUser} msgAlert={msgAlert}/>
				<Routes>
					<Route 
						path='/'
						element={
						<RequireAuth user={user}>
							<Home msgAlert={msgAlert} user={user} />
						</RequireAuth>
						} 
						/>
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/change-password'
						element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route
						path='/project/:projId'
						element={
						<RequireAuth user={user}>
							<ProjectShow msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route
						path='/issue/:issueId'
						element={
						<RequireAuth user={user}>
							<IssueShow msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App
