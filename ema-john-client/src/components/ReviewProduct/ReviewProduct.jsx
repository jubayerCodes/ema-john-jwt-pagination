import './ReviewProduct.css'
import React, { useState } from 'react';
import productPlaceHolder from '../../assets/images/product-placeholder.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const ReviewProduct = ({ product, handleRemoveFromCart, handleChangeQuantity }) => {
    const { img, name, price, shipping, quantity } = product
    const [newQuantity, setNewQuantity] = useState(quantity)

    const handleInput = (newQuantity, product) => {
        setNewQuantity(newQuantity)
        handleChangeQuantity(product, newQuantity)
    }

    return (
        <div className='review-product'>
            <div className="review-product-top">
                <img src={img || productPlaceHolder} alt="" className="review-product-img" />
            </div>
            <div className="review-product-middle">
                <h3 className="review-product-name">
                    {name}
                </h3>
                <h5 className="review-product-price">
                    Price: ${price}
                </h5>
                <h6 className="review-product-rating">
                    Shipping Charge: ${shipping}
                </h6>
                <h4 className="review-product-quantity">
                    Quantity:
                    <input type="number" name="" className='quantity-input' min={0} value={newQuantity} onInput={e => handleInput((parseInt(e.target.value) || 0), product)} />
                </h4>
            </div>
            <div className="review-product-bottom">
                <button className='review-product-btn btn' onClick={() => handleRemoveFromCart(product)}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </div>
    );
};

export default ReviewProduct;