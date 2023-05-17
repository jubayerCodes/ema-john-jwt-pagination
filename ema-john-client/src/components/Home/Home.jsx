import { Link } from 'react-router-dom';
import './Home.css'
import React from 'react';
import BannerImg from '../../assets/images/two-fashionable-young-women-casual-trendy-spring-coat-boots-with-heels-black-hat-stylish-handbag.jpg'

const Home = () => {
    return (
        <section className='banner'>
            <div className="banner-container">
                <div className="banner-content">
                    <h5 className="discount">
                        Sale up to 70% off
                    </h5>
                    <h1 className="banner-title">
                        New Collection For Fall
                    </h1>
                    <p className='banner-desc'>
                        Discover all the new arrivals of ready-to-wear collection.
                    </p>
                    <Link to="/shop">
                        <button className='banner-btn'>Shop Now</button>
                    </Link>
                </div>
                <div className="banner-img">
                    <img src={BannerImg} alt="" />
                </div>
            </div>
        </section>
    );
};

export default Home;