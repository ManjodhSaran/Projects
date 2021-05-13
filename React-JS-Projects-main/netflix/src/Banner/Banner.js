import React, { useState, useEffect } from 'react'

import axios from '../axios'
import requests from '../requests'

import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length) - 1
                ]
            )
        }
        fetchData()
    }, [])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div className="banner"
            style={{ backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")` }}
        >
            <div className="banner-content">
                <h1>{movie?.name || movie?.original_name || movie?.title}</h1>
                <div className="banner-buttons">
                    <button>Play</button>
                    <button>My List</button>
                </div>
                <h2>{truncate(movie?.overview, 150)}</h2>
            </div>
            <div className="banner-fadeBottom"></div>
        </div>
    )
}

export default Banner
