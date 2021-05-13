import React, { useState, useEffect } from 'react'

import './Header.css'

function Header() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        });
        return () => window.removeEventListener("srcoll");

    }, [])

    return (
        <div className={`header ${show && "header-black"}`}>
            <img
                className="logo"
                src="https://1000logos.net/wp-content/uploads/2017/05/Netflix-Logo.png"
                alt="Netflix"
            />

            <img
                className="avatar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
                alt="avatar"
            />
        </div>
    )
}

export default Header
