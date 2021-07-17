import React from 'react'
import '../styles/ContactUsCard.scss'

const ContactUsCard = ({ title, buttonTitle, buttonAction, text }) => {
    return (
        <div className='contactUsCard'>
            <h3>{title}</h3>
            <p>{text}</p>
            <button onClick={buttonAction}>{buttonTitle}</button>
        </div>
    )
}

export default ContactUsCard
