import React from 'react'

import './Contact.css'

const Contact = () => {

    return (
        <div className='contact' style={{ minHeight: `${window.innerHeight * .8}px` }}>
            <h2 className='contact__email'>Email us at <span>info@sdtruckers.com</span></h2>
        </div>
    )
}

export default Contact
