import React, { useState } from 'react'
import '../styles/Time.scss'
const Time = ({ time, hidden }) => {
    const [selected, setSelected] = useState(false);
    return (
        <p
            className={`
                meeting__time 
                ${selected && 'meeting__time--selected'}
                ${hidden && 'meeting__time--hidden'}
            `}
            onClick={() => setSelected(!selected)}
        >
            {time}
        </p>
    )
}

export default Time
