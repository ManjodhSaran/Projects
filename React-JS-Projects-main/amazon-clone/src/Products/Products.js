import React from 'react'

import './Products.css'
import Product from './Product/Product'

function Products() {
    return (
        <div className="products">
            <div className="products-row">
                <Product
                    id="12321341"
                    title="OPPO Find X2 (12GB)| Rs 5000 off on HDFC cards | 65W Super VooC charger"
                    price={11.36}
                    rating={5}
                    image="https://m.media-amazon.com/images/I/41jQ2tsgBjL.__AC_SY200_.jpg"
                />
                <Product
                    id="12321341"
                    title="OPPO Find X2 (12GB)| Rs 5000 off on HDFC cards | 65W Super VooC charger"
                    price={11.36}
                    rating={5}
                    image="https://m.media-amazon.com/images/I/41jQ2tsgBjL.__AC_SY200_.jpg"
                />
            </div>
            <div className="products-row">
                <Product
                    id="12321341"
                    title="OPPO Find X2 (12GB)| Rs 5000 off on HDFC cards | 65W Super VooC charger"
                    price={11.36}
                    rating={5}
                    image="https://m.media-amazon.com/images/I/41jQ2tsgBjL.__AC_SY200_.jpg"
                />
                <Product
                    id="12321341"
                    title="OPPO Find X2 (12GB)| Rs 5000 off on HDFC cards | 65W Super VooC charger"
                    price={11.36}
                    rating={5}
                    image="https://m.media-amazon.com/images/I/41jQ2tsgBjL.__AC_SY200_.jpg"
                />
                <Product
                    id="12321341"
                    title="OPPO Find X2 (12GB)| Rs 5000 off on HDFC cards | 65W Super VooC charger"
                    price={11.36}
                    rating={5}
                    image="https://m.media-amazon.com/images/I/41jQ2tsgBjL.__AC_SY200_.jpg"
                />
            </div>
            <div className="products-row">
                <Product
                    id="12321341"
                    title="METZ 138 cm (55 Inch) 4K UHD Smart Certified Android OLED TV M55S9A (Gray) (2019 Model)"
                    price={2872.23}
                    rating={3}
                    image="https://www.maxim.com/.image/t_share/MTYzNTc0NzA4MzI1ODUyNTg3/sony-tv-8k-2.png"
                />
            </div>
        </div>
    )
}

export default Products
