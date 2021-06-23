import { Avatar, Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import '../styles/Home.scss'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';

const Home = () => {
    const [user] = useAuthState(auth);
    const userData = useSelector(selectUser);
    const history = useHistory();
    return (
        <div className="home">
            <div className="home__header">
                <div className="home__headerBrand">
                    <img src="https://lh3.googleusercontent.com/proxy/gU8aQxnXyEUX8tS8sZPyjvIHvOzEURfV8aQ4JkAgtb7jktG30C4-agCiAluJDX10TOBtQg237zBThyN7JXvVGnsb" alt="app__logo" />
                    <h1>GSSS PORTAL</h1>
                </div>
                <div className="home__headerNav">
                    <h3>...</h3>
                    <h3>...</h3>
                    <h3>...</h3>
                    <h3>...</h3>
                </div>
                {!user ?
                    <div>
                        <Button onClick={() => history.push('/get Started')} variant="outlined" color="primary">Sign Up</Button>
                    </div>
                    :
                    <div>
                        <Avatar src={user?.photoURL} onClick={() => auth.signOut()} />
                    </div>
                }
            </div>
            <div className="home__body">

                <div className="home__bodyLeft">
                    {!user ?
                        <div>
                            <h1>Student Portal</h1>
                            <Button onClick={() => history.push('/get started')} variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>Get Started</Button>
                        </div>
                        :
                        <div className="home__bodyLeft">
                            <div>
                                <h1>Hello, {userData?.name?.split(" ")[0]}</h1>
                                <Button onClick={() => history.push('/application/dashboard')} variant="contained" color="primary" endIcon={<ArrowForwardIcon />}>Dashboard</Button>
                            </div>
                        </div>
                    }
                </div>
                <div className="home__bodyRight">
                    {/* <div className="home__circle"></div> */}
                    <img src={'https://firebasestorage.googleapis.com/v0/b/gsss-portal.appspot.com/o/assests%2FhomeScreen%20Image.png?alt=media&token=d609424e-4808-4c87-a064-95d7310b1ddd'} alt="app__homeIcon" />
                </div>

            </div>
            <div className="home__footer"></div>
        </div>
    )
}

export default Home
