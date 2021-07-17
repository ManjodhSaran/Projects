import React from 'react'
import Logo from '../assets/icons/logo.svg'
import CitiesImage from '../assets/icons/cities.svg'
import GoogleIcon from '../assets/icons/google.png'
import '../styles/Login.scss'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory()

    const handleLogin = () => {
        history.push('/home')
    }

    return (
        <div className='login'>
            <img className='login__logo' src={Logo} alt="appImage" />
            <h1>Log in</h1>
            <img className='login__cities' src={CitiesImage} alt="appImage" />
            <button className="login__google" onClick={handleLogin}>
                <img src={GoogleIcon} />
                <p>Continue with Google</p>
            </button>
            <hr />
            <input type="text" placeholder='Email' />
            <button className="login__email" onClick={handleLogin}>Send me a login link</button>
        </div>
    )
}

export default Login
