import React from 'react'

import './Banner.css'

const Banner = () => {
    console.log(window.innerHeight)

    const bannerStyle = {
        minHeight: `${window.innerHeight * .8}px`,
        backgroundImage: `url('${`https://source.unsplash.com/1600x${window.innerHeight}/?trucking`}')`
    }

    return (
        <div className='banner' style={bannerStyle}>
            <h1 className="banner__title">SD TRUCKERS</h1>
            {/* <div id="carouselExampleSlidesOnly" className="carousel slide carousel-fade" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className='img-fluid' src={`https://source.unsplash.com/1600x${window.innerHeight}/?trucking`} className="d-block w-100" alt="image-trucking" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/1600x900/?truckdriver" className="d-block w-100" alt="image-trucking" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/1600x900/?truck" className="d-block w-100" alt="image-trucking" />
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Banner
