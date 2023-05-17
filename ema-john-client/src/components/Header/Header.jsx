import React, { useContext } from 'react';
import './Header.css'
import logo from '../../assets/images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleLogOut = () => {
        logOut()
            .then(() => {
                localStorage.removeItem('accessToken')
            })
    }


    return (
        <header className='header'>
            <div className="header-container">
                <div className="header-logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="header-menu">
                    <ul className="header-ul">
                        <li className="header-li">
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li className="header-li">
                            <Link to="/shop">
                                Shop
                            </Link>
                        </li>
                        <li className="header-li">
                            <Link to="/review">
                                Order Review
                            </Link>
                        </li>
                        <li className="header-li">
                            <Link to="/inventory">
                                Manage Inventory
                            </Link>
                        </li>
                    </ul>
                </div>
                {
                    user ?
                        <>
                            <div className="header-profile">

                                <h4>{user?.displayName}</h4>
                                <button onClick={handleLogOut}>Log Out</button>
                            </div>
                        </>
                        :
                        <>
                            <Link to="/login" className='login-link'>
                                Login
                            </Link>
                        </>
                }
            </div>
        </header>
    );
};

export default Header;