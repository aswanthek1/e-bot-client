import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Auth.css';
import Axios from 'axios'
import { config } from '../../../config/config';
import { validEmail } from '../../../utils/common.utils';

const {BACKEND_BASE_URL} = config

const Login = () => {
    const [formState, setFormState] = useState({email: '', password: ''})
    const navigate = useNavigate()
    const handleChange = (event) => {
        setFormState({...formState, [event.target.name]:event.target.value})
    } 
    const handleSubmit = async(event) => {
        event.preventDefault()
        try {
            console.log(formState)
            if(!validEmail.test(formState.email)) {
                alert("Please enter a valid email")
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
            const {data} = await Axios.post(`${BACKEND_BASE_URL}/user/login`, formState)
            console.log(data, 'do submit')
            localStorage.setItem("token", data?.accessToken)
            localStorage.setItem("role", data?.data?.role)
            localStorage.setItem("userId", data?.data?._id)
            setFormState({email: '', password: ''})
            // navigate('/')
            window.location.reload();
        }catch(error) {
            console.log(error, 'a;lsdkjflasdkjf')
            alert(error.response?.data?.message || 'Something went wrong!')
        }
    }
    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input onChange={handleChange} type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input onChange={handleChange} type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <span style={{marginTop:"10px"}} >Don't have an account? <Link to={'/register'} >Register</Link> </span>
                </form>
            </div>
        </div>
    )
}

export default Login;