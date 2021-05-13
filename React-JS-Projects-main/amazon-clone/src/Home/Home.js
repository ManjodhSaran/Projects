import React from 'react';

import Banner from '../Banner/Banner';

import './Home.css';
import Products from '../Products/Products';

function Home() {
    return (
        <div className="home">
            <Banner />
            <Products />
        </div>
    )
}

export default Home
