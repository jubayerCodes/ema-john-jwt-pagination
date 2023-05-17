import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'
import { AuthContext } from '../../Providers/AuthProvider';
import { updateProfile } from 'firebase/auth';

const Register = () => {

    const { signUp } = useContext(AuthContext)

    const handleRegister = (e) => {
        e.preventDefault()

        const form = e.target
        const photo = form.photo.value
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value

        console.log(photo);

        signUp(email, password)
            .then(result => {
                const user = result.user

                handleUpdateProfile(user, name, photo)

                e.target.reset()
            })
            .catch(error => console.log(error.message))

    }

    const handleUpdateProfile = (user, name, photo) => {
        updateProfile(user, {
            displayName: name,
            photoURL: photo
        })
    }

    return (
        <section className='register'>
            <div className="register-container">
                <h2 className="form-title">
                    Register
                </h2>
                <form className='form' onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="name-input">
                            Full Name
                            <input type="text" name='name' id='name-input' className='name-input' required placeholder='Your name' />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email-input">
                            Email
                            <input type="email" name='email' id='email-input' className='email-input' required placeholder='Your Email' />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo-input">
                            Photo Link
                            <input type='url' name='photo' id='photo-input' className='photo-input' required placeholder='Your Photo' />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-input">
                            Password
                            <input type="password" name='password' id='password-input' required className='password-input' placeholder='Your password' />
                        </label>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" id='register-btn' />
                        <label className='row-label'>
                            Already Registered? <Link to="/login" className='login-link'>Login</Link>
                        </label>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;