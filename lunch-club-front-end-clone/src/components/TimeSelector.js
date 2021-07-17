import React from 'react'
import Time from './Time'
import '../styles/TimeSelector.scss'

const TimeSelector = ({ day, date, notAvailable }) => {
    const availableTime = ['9:30am', '1:30pm', '6:30pm', '8:30pm', '9:30pm',]
    return (
        <div className='timeSelector'>
            <h3>{day}</h3>
            <p>{date}</p>
            {availableTime.map(time =>
                <Time key={time} time={time} hidden={time === notAvailable} />
            )}
        </div>
    )
}

export default TimeSelector
