import React, { Fragment } from 'react'
import {Nav,NavDropdown,Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {BiBug} from 'react-icons/bi'

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<NavDropdown title="My Account&nbsp;&nbsp;&nbsp;"  id="dropdown-style">
		<NavDropdown.Item className="navv-link">
			<Link to='change-password' className="navv-link">Change Password</Link>
		</NavDropdown.Item>
		<NavDropdown.Item className="navv-link" >
			<Link to='sign-out' className="navv-link">Sign Out</Link>
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



const Header = ({ user }) => (
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
)

export default Header
