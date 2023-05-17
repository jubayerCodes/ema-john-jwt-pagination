import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import { AuthContext } from '../../Providers/AuthProvider';

const Login = () => {

    const navigate = useNavigate()

    const { signIn, signIntWithGoogle } = useContext(AuthContext)
    const location = useLocation()

    const from = (location?.state?.from?.pathname) || '/'

    // console.log(from);

    const handleLogin = e => {
        e.preventDefault()

        const form = e.target
        const email = form.email.value
        const password = form.password.value

        signIn(email, password)
            .then((res) => {
                const user = res.user
                setToken(user)
            })
            .catch(error => console.log(error.message))
    }

    const handleSignInWithGoogle = () => {
        signIntWithGoogle()
            .then((res) => {
                const user = res.user
                setToken(user)
            })
            .catch(error => console.log(error.message))
    }

    const setToken = (user) => {
        const email = { email: user.email }

        fetch('http://localhost:5000/jwt', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(email)
        })
            .then(res => res.json())
            .then(data => {
                const token = data.token

                localStorage.setItem('accessToken', token)
            })
            .then(() => {
                navigate(from, { replace: true })
            })
    }

    return (
        <section className='login'>
            <div className="login-container">
                <h2 className="form-title">
                    Login
                </h2>
                <form className='form' onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email-input">
                            Email
                            <input type="email" name='email' id='email-input' className='email-input' required placeholder='Your Email' />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-input">
                            Password
                            <input type="password" name='password' id='password-input' required className='password-input' placeholder='Your password' />
                        </label>
                    </div>
                    <div className="form-group form-btn-group">
                        <input type="submit" value="Login" id='login-btn' />
                        <label className='row-label'>
                            New To Amazon? <Link to="/register" className='register-link'>Create New Account.</Link>
                        </label>
                    </div>
                </form>

                <div className="divider">
                    --------------- Or ----------------
                </div>

                <button className='google-btn' onClick={handleSignInWithGoogle}>Continue with Google</button>
            </div>
        </section>
    );
};

export default Login;