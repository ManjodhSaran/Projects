import React from 'react'

import './Product.css'
import { useStateValue } from '../../StateProvider';

function Product({ id, title, image, price, rating }) {

    const [{ cart }, dispatch] = useStateValue();

    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_CART",
            item: { id, title, image, price, rating }
        })
    }

    return (
        <div className="product">
            <div className="product-info">
                <p className="product-title">{title}</p>
                <p className="product-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product-rating">
                    {
                        Array(rating)
                            .fill()
                            .map((_) => <p>⭐</p>)
                    }
                </div>
            </div>
            <img src={image} alt={title} />
            <button onClick={addToBasket}>Add to Cart</button>
        </div>
    )
}

export default Product
