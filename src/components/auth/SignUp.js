// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'
import {Form,Button,Row,Col} from 'react-bootstrap'


const SignUp = (props) => {
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [role, setRole] = useState('')
    // org == organization
    const [org, setOrg] = useState('')

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {email, password, passwordConfirmation, first, last, role, org}

		signUp(credentials)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}


    return (
        <div className='credentials-container'>
            <div className='signup'>
                <h3 className='auth-header'>Sign Up</h3>
                <p className='new-user'>
                    Have An Account?&nbsp; 
                    <Link to='/sign-in'>Sign In</Link>
                </p>
                <Form onSubmit={onSignUp} className="signin-form">
                    <Row>
                        <Col>
                            <Form.Group controlId='firstName' className='form-group'>
                                    <Form.Control
                                        required
                                        type='string'
                                        name='firstName'
                                        value={first}
                                        placeholder='Enter First Name'
                                        onChange={e => setFirst(e.target.value)}
                                    />
                                </Form.Group>

                        </Col>
                        <Col>
                            <Form.Group controlId='lastName' className='form-group'>
                                <Form.Control
                                    required
                                    type='string'
                                    name='lastName'
                                    value={last}
                                    placeholder='Enter Last Name'
                                    onChange={e => setLast(e.target.value)}
                                />
                            </Form.Group>

                        </Col>
                    </Row>
                    
                    <Form.Group controlId='email' className='form-group'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicSelect" className='form-group'>
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={e => setRole(e.target.value)}
                                    name="type"
                                    type="string"
                                >
                                    <option value="">Select Role</option>
                                    <option value="be">Back End Engineer</option>
                                    <option value="ds">Data Scientist</option>
                                    <option value="fe">Front End Engineer</option>
                                    <option value="fs">Full Stack Engineer</option>
                                    <option value="intern">Intern</option>
                                    <option value="pm">Product Manager</option>
                                    <option value="tl">Tech Lead</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicSelect" className='form-group'>
                                <Form.Label>Company/Organization</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={e => setOrg(e.target.value)}
                                    name="type"
                                    type="string"
                                >
                                    <option value="">Select Company/Organization</option>
                                    <option value="demo">Demo</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId='password' className='form-group'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation' className='form-group'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            required
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            type='password'
                            placeholder='Confirm Password'
                            onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                    </Form.Group>
                    <button className='auth-button' type='submit'>
                        Sign Up
                    </button>
                </Form>
            </div>
        </div>
    )

}

export default SignUp