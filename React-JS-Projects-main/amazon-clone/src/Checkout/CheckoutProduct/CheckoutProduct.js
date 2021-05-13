import React from 'react'

import './CheckoutProduct.css';
import { useStateValue } from '../../StateProvider';

function CheckoutProduct({ id, image, title, price, rating }) {

    const [{ cart }, dispatch] = useStateValue();

    function removeFromBasket() {
        dispatch({
            type: "REMOVE_FROM_CART",
            id: id
        })
    }

    return (
        <div className="checkout-product">
            <img src={image} alt="" />

            <div className="checkout-product-info">
                <h2>{title}</h2>
                <p>
                    <small>$</small>
                    <strong>{price}</strong>
                </p>

                <div className="checkout-product-rating">
                    {
                        Array(rating)
                            .fill()
                            .map((_) => <p>⭐</p>)
                    }
                </div>

                <button onClick={removeFromBasket}>Remove From Cart</button>
            </div>

        </div>
    )
}

export default CheckoutProduct
