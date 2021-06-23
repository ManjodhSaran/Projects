import React from 'react'
import RingLoader from "react-spinners/RingLoader";
import '../styles/LoadingScreen.scss'

const LoadingScreen = ({ variant }) => {
    return (
        <div className="loadingScreen">
            {variant}
            <RingLoader color='#006359' size={100} />
        </div>
    )
}

export default LoadingScreen
