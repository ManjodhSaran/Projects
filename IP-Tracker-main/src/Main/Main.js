import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react'

import './Main.css'
import StoreIP from './StoreIP/StoreIP';

const Main = () => {

    const [IP, setIP] = useState(undefined);
    const [geo, setGeo] = useState([]);

    const [location, setLocation] = useState(undefined);


    return (
        <main>
            <StoreIP IP={IP} setIP={setIP} geo={geo} setGeo={setGeo} />
            <div className="main__yourip">

                {geo['country_name'] || geo['IPv4'] ?
                    <>
                        <h1>Your IP Address: <span className='yourip'>{IP}</span></h1>
                        <div className='ip__info'>
                            <h2>Available Info</h2>
                            {geo['state'] && <p>City:<span className="ip__infoBar">{geo['state']}</span></p>}
                            {geo['state'] && <p>State:<span className="ip__infoBar">{geo['state']}</span></p>}
                            {geo['postal'] && <p>Postal:<span className="ip__infoBar">{geo['postal']}</span></p>}
                            {geo['country_name'] && <p>Country:<span className="ip__infoBar">{geo['country_name']}</span></p>}
                            {geo['latitude'] && <p>Latitude:<span className="ip__infoBar">{geo['latitude']}</span></p>}
                            {geo['longitude'] && <p>Longitude:<span className="ip__infoBar">{geo['longitude']}</span></p>}
                            {geo['IPv4'] && <p>IPv4:<span className="ip__infoBar">{geo['IPv4']}</span></p>}
                        </div>
                    </>
                    :
                    <CircularProgress className="progressBar" />
                }
            </div>

        </main>
    )
}

export default Main
