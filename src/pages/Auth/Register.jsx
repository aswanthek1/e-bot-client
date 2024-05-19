import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Auth.css';
import Axios from 'axios'
import { config } from '../../../config/config';
import { validEmail } from '../../../utils/common.utils';

const {BACKEND_BASE_URL} = config

const Register = () => {
    const [formState, setFormState] = useState({email: '', password: '', name: ''})
    const navigate = useNavigate()
    const handleChange = (event) => {
        setFormState({...formState, [event.target.name]:event.target.value})
    } 
    console.log(formState)
    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            if(!validEmail.test(formState.email)) {
                alert("Please enter a valid email")
                return
            }
            if(!formState.name ||  formState.name.trim().length < 3) {
                alert("Name needs minimum 3 chars")
                return
            }
            if(!formState.password || formState.password.includes(" ")) {
                alert("Cannot enter spaces in between password")
                return
            }
            if(!formState.password || formState.password.trim().length < 3 ) {
                alert("Password needs minimum 3 chars")
                return
            }
            const doSubmit = await Axios.post(`${BACKEND_BASE_URL}/user/register`, formState)
            console.log(doSubmit, 'do submit')
            setFormState({email: '', password: '', name:""})
            alert('Successfully Completed Registration.')
            navigate('/login')
        }catch(error) {

        }
    }
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                        <label htmlFor="email">Name:</label>
                        <input onChange={handleChange} type="name" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input onChange={handleChange} type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input onChange={handleChange} type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="login-button">Register</button>
                    <span style={{marginTop:"10px"}} >Already have an account? <Link to={'/login'} >Login</Link> </span>
                </form>
            </div>
        </div>
    )
}

export default Register;