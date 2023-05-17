import React, { useContext, useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Shop = () => {
    const { user, logOut } = useContext(AuthContext)

    const location = useLocation()
    const navigate = useNavigate()

    const products = useLoaderData()
    const [cart, setCart] = useState([])

    // console.log(cart);

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
                        logOut()
                            .then(() => {
                                localStorage.removeItem('accessToken')
                                navigate('/login', { replace: true, state: { from: location } })
                            })
                    } else {
                        setCart(data)
                    }
                })
        }
    }, [user])


    const handleAddToCart = (product) => {

        const addedProduct = product
        delete addedProduct._id
        addedProduct.email = user?.email
        addedProduct.quantity = 1

        // console.log(addedProduct);


        fetch('http://localhost:5000/cart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId || data.modifiedCount) {
                    const newCart = [...cart]

                    const newProduct = addedProduct

                    newCart.push(newProduct)

                    setCart(newCart)
                }

                // if(data.modifiedCount){
                //     const newCart = cart.filter(c => c.productId !== addedProduct.productId)
                //     const exist = cart.find(c => c.productId === addedProduct.productId)

                //     console.log(exist);

                //     if(exist){
                //         const quantity = exist.quantity
                //         exist.quantity = quantity + 1
                //         newCart.push(exist)
                //         console.log(exist)
                //         setCart(newCart)
                //     }
                // }
            })
    }

    const handleClearCart = () => {

        fetch(`http://localhost:5000/cart?email=${user?.email}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    setCart([])
                }
            })
    }

    return (
        <section className='shop'>
            <div className="shop-container">
                <div className="products-container">
                    {products.map(product => <Product key={product.productId} product={product} handleAddToCart={handleAddToCart} />)}
                </div>
                <div className="cart">
                    <Cart cart={cart} handleClearCart={handleClearCart} >
                        <Link to="/review"><button className='review-order-btn btn'>Review Order</button></Link>
                    </Cart>
                </div>
            </div>
        </section>
    );
}

export default Shop;