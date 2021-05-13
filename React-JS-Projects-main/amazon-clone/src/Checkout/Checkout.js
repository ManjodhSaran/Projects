import React from 'react'

import './Checkout.css'
import { useStateValue } from '../StateProvider'
import CheckoutProduct from './CheckoutProduct/CheckoutProduct';
import SubTotal from './SubTotal/SubTotal';

function Checkout() {
    const [{ cart }] = useStateValue();

    return (
        <div className="checkout">

            {cart?.length === 0 ? (
                <div className="checkout-products">
                    <h2>Your Shopping Basket is Empty</h2>
                    <p>You have no item in your Cart. TO buy one or more items, click "Add to Cart" next to the item.</p>
                    <hr />
                </div>
            ) : (
                    <div className="checkout-products">
                        <h2>Your Shopping Basket</h2>
                        <hr />
                        {cart.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                )}

            {cart?.length > 0 && (
                <div className="checkout-subtotal">
                    <SubTotal />
                </div>
            )}
        </div>
    );
}

export default Checkout
