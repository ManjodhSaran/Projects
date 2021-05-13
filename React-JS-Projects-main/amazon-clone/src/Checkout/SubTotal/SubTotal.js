import React from 'react'

import CurrencyFormat from "react-currency-format"

import './SubTotal.css'
import { useStateValue } from '../../StateProvider';
import { getCartTotal } from '../../reducer';

function SubTotal() {
    const [{ cart }] = useStateValue();
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({cart.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal-gift">
                            <input type="checkbox" />This order contains gift.
                    </small>
                    </>
                )}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button>Proceed To Checkout</button>
        </div>
    )
}

export default SubTotal
