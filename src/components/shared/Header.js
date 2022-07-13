import React, { Fragment } from 'react'
import {Nav,NavDropdown,Navbar} from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import {BiBug} from 'react-icons/bi'
import { signOut } from '../../api/auth'
import messages from './AutoDismissAlert/messages'

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const Header = ({ user,clearUser,msgAlert }) => {
	
	const navigate = useNavigate()
    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/sign-in'))
			.finally(() => clearUser())
    }
	const authenticatedOptions = (
		<NavDropdown title="My Account&nbsp;&nbsp;&nbsp;"  id="dropdown-style">
			<NavDropdown.Item className="navv-link">
				<Link to='change-password' className="navv-link">Change Password</Link>
			</NavDropdown.Item>
			<NavDropdown.Item className="navv-link" >
				<div onClick={onSignOut} className="navv-link">Sign Out</div>
			</NavDropdown.Item>
		</NavDropdown>
	)
	
	const unauthenticatedOptions = (
		<>
			<Nav.Link>
				<Link to='sign-up' style={linkStyle}>Sign Up</Link>
			</Nav.Link>
			<Nav.Link>
				<Link to='sign-in' style={linkStyle}>Sign In</Link>
			</Nav.Link>
		</>
	)

	return (
	<Navbar bg='dark' >
		<Navbar.Brand className='icon-nav'>
			{
				user?
					<Link to='/' style={linkStyle} >
						Bug Tracker <BiBug/>
					</Link>
					:
					<Link to='/sign-in' style={linkStyle} >
					Bug Tracker <BiBug/>
					</Link>

			}
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav' className="justify-content-end">
			<Nav className='ml-auto'>
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)}

export default Header
