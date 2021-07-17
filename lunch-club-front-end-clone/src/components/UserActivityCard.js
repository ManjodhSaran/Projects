import React from 'react'
import '../styles/UserActivityCard.scss'

const UserActivityCard = ({ title, icon, score }) => {
    return (
        <div className='userActivityCard'>
            <div className='upper'>
                <img src={icon} alt="" />
                <p>{score}</p>
            </div>
            <p>{title}</p>
        </div>
    )
}

export default UserActivityCard
