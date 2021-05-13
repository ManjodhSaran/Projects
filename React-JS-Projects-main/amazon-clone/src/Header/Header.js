import React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import './Header.css'
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';

function Header() {
    const [{ cart, user }, dispatch] = useStateValue();

    const login = () => user && auth.signOut();

    return (
        <div className="header">

            <div className="header-start">
                <Link to="/">
                    <img
                        className="header-logo"
                        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                        alt="amazon"
                    />
                </Link>
            </div>

            <div className="header-mid">
                <input type="text" className="header-input" />
                <SearchIcon className="header-searchIcon" />
            </div>

            <div className="header-end">

                <Link to={!user && "/login"} className="header-link">
                    <div onClick={login} className="header-option">
                        <span className="header-option-line1">Hello {user?.email}</span>
                        <span className="header-option-line2">{user ? "Sign Out" : "Sign In"}</span>
                    </div>
                </Link>

                <Link to="" className="header-link">
                    <div className="header-option">
                        <span className="header-option-line1">Returns</span>
                        <span className="header-option-line2">& Orders</span>
                    </div>
                </Link>

                <Link to="" className="header-link">
                    <div className="header-option">
                        <span className="header-option-line1">Your</span>
                        <span className="header-option-line2">Prime</span>
                    </div>
                </Link>

                <Link to="/checkout" className="header-link">
                    <div className="header-cart">
                        <ShoppingCartOutlinedIcon className="header-cartIcon" />
                        <div className="header-option">
                            <span className="header-option-line1">{cart?.length}</span>
                            <span className="header-option-line2">Cart</span>
                        </div>
                    </div>
                </Link>
            </div>

        </div>
    )
}

export default Header
//