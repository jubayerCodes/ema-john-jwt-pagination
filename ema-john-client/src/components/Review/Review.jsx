import React, { useContext, useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import './Review.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import { AuthContext } from '../../Providers/AuthProvider';

const Review = () => {
    const { user, logOut } = useContext(AuthContext)
    const [cart, setCart] = useState([])

    const location = useLocation()
    const navigate = useNavigate()



    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/cart?email=${user?.email}`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        // console.log(data);
                        logOut()
                            .then(() => {
                                localStorage.removeItem('accessToken')
                                navigate('/login', { replace: true, state: { from: location } })
                            })
                    }

                    // console.log(data);
                    setCart(data)
                })
        }
    }, [user])

    const handleRemoveFromCart = (product) => {
        // let newCart = []
        // const remainingProducts = cart.filter(pd => pd._id !== product._id)
        // newCart = [...remainingProducts]
        // setCart(newCart)
        // removeFromDb(product._id)

        console.log(product);

        fetch(`http://localhost:5000/cart/${product._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {

                    const remainingCart = cart.filter(c => c._id !== product._id)
                    setCart(remainingCart)
                }
            })
    }

    const handleClearCart = () => {
        deleteShoppingCart()
        setCart([])
    }

    const handleChangeQuantity = (product, newQuantity) => {
        let newCart = [...cart]

        const exist = cart.find(pd => pd._id === product._id)
        exist.quantity = newQuantity
        const existIndex = newCart.indexOf(exist);
        newCart.splice(existIndex, 1, exist);

        setCart(newCart)
        addToDb(product['id'], newQuantity)
    }

    return (
        <section className='review'>
            <div className="review-container">
                <div className="review-products">
                    {
                        cart?.length !== 0 ?
                            cart?.map(product => <ReviewProduct key={product._id} product={product} handleRemoveFromCart={handleRemoveFromCart} handleChangeQuantity={handleChangeQuantity}></ReviewProduct>)

                            :

                            <h1 className='warning-message'>No Products Added</h1>
                    }
                </div>
                <div className="cart">
                    <Cart cart={cart} handleClearCart={handleClearCart}>
                        <Link to="/checkout" ><button className='review-order-btn btn'>proceed checkout</button></Link>
                    </Cart>
                </div>
            </div>
        </section>
    );
};

export default Review;