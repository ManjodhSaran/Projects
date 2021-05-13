import React, { useEffect, useState } from 'react'
import FlipMove from "react-flip-move"

import './Results.css'
import VideoCard from './VideoCard/VideoCard'
import axios from '../axios'

function Results({ selectedOption }) {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(selectedOption);
            setMovies(request.data.results);
        }

        fetchData();
    }, [selectedOption]);

    return (
        <FlipMove className="results">
            {movies.map(movie => <VideoCard key={movie.id} movie={movie} />)}
        </FlipMove>
    )
}

export default Results
