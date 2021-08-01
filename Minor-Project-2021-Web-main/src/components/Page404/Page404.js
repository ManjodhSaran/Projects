import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import './Page404.css'
const Page404 = () => {
    document.title = "Page Not Found "
    return (
        <div className="page404">
            <h1>PAGE NOT FOUND</h1>
            <Link to="/" className="page404__button"> <Button variant="contained">HOME</Button></Link>
        </div>
    )
}
export default Page404