import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";

const Loading = () => {
    return (
        <div className="loading">
            <BounceLoader color='#8BC6EC' size={150} />
        </div>
    )
}

export default Loading
