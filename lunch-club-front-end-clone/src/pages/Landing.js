import React from 'react'
import '../styles/Landing.scss'
import { Button } from '@material-ui/core';
import Logo from '../assets/icons/logo.svg'
import GoogleIcon from '../assets/icons/google.png'
import InstagramIcon from '../assets/icons/instagram.svg'
import LinkedinIcon from '../assets/icons/linkedin.svg'
import TwitterIcon from '../assets/icons/twitter.svg'
import LogoIcon from '../assets/icons/logo-icon.svg'
import DownarrowIcon from '../assets/icons/downarrow.svg'
import StrokeIcon from '../assets/icons/stroke.svg'
import Testimonials from '../components/Testimonials';
import { useHistory } from 'react-router-dom';


const Landing = () => {
    const history = useHistory();
    const goToLogin = () => {
        history.push('/login')
    }
    return (
        <div className="signup">
            <div className="signup__header">
                <img src={Logo} alt="appImage" />
                <button onClick={goToLogin}>Log in</button>
            </div>
            <div className="signup__content">
                <div className="signup__contentLeft">
                    <h1>Your network is waiting for you.</h1>
                    <p>We facilitate casual conversations that lead to not-so-casual professional impact. Powered by AI.</p>
                    <div className="signup__form">
                        <div className="signup__google" onClick={goToLogin}>
                            <img src={GoogleIcon} />
                            <p>Sign up with Google</p>
                        </div>
                        <p className='signup__or'>OR</p>
                        <div className="signup__withEmail">
                            <input type="text" placeholder="Enter your email" />
                            <Button classname='bg-primary' onClick={goToLogin}>Get Started</Button>
                        </div>
                    </div>
                    <div className='loginInstead'>
                        <p>Already have an account?</p>
                        <a href="#">Log in here.</a>
                    </div>
                </div>

                <Testimonials />

            </div>
            <div className="howitworks">
                <img className='downArrowIcon' src={DownarrowIcon} alt="appImage" />
                <h4>HOW IT WORKS</h4>
                <h1>It's simple, really <img src={StrokeIcon} alt="appImage" /></h1>
                <div className="howitworks__cards">
                    <div className="howitworks__card">
                        <img src="https://lunchclub.com/static/media/tell.9ad906c2.svg" alt="appImage" />
                        <p>Tell us your background, goals, and what you're excited about</p>
                    </div>
                    <div className="howitworks__card">
                        <img src="https://lunchclub.com/static/media/connection.5e02f461.svg" alt="appImage" />
                        <p>Each week, we'll see if you'd like to meet with a new connection</p>
                    </div>
                    <div className="howitworks__card">
                        <img src="https://lunchclub.com/static/media/conversation.5acf03c4.svg" alt="appImage" />
                        <p>Our AI will arrange for a 1:1 conversation with a match</p>
                    </div>
                </div>
            </div>
            <div className="pressHighlight">
                <h4>PRESS HIGHLIGHTS</h4>
                <h1>We're getting noticed.</h1>
                <div className="pressHighlight__cards">
                    <div className="pressHighlight__card">
                        <img src="https://lunchclub.com/static/media/wsj.24908341.svg" alt="appImage" />
                    </div>
                    <div className="pressHighlight__card">
                        <img src="https://lunchclub.com/static/media/forbes.93862742.svg" alt="appImage" />
                    </div>
                    <div className="pressHighlight__card">
                        <img src="https://lunchclub.com/static/media/bi.a3aa84d1.svg" alt="appImage" />
                    </div>
                    <div className="pressHighlight__card">
                        <img src="https://lunchclub.com/static/media/tc.20545d5f.svg" alt="appImage" />
                    </div>
                    <div className="pressHighlight__card">
                        <img src="https://lunchclub.com/static/media/cnbc.db6b4373.svg" alt="appImage" />
                    </div>
                </div>
                <div className="investors">
                    <h4>OUR INVESTORS</h4>
                    <div className="investors__cards">
                        <div className="investors__card"><img src="https://lunchclub.com/static/media/lsvp.2df42289.svg" alt="appImage" /></div>
                        <div className="investors__card"><img src="https://lunchclub.com/static/media/coatue.6f4d255b.svg" alt="appImage" /></div>
                        <div className="investors__card"><img src="https://lunchclub.com/static/media/a16z.b808fbed.svg" alt="appImage" /></div>
                    </div>
                </div>
            </div>
            <div className="joinclub">
                <div className="joinclub__content">
                    <div className="joinclub__left">
                        <h4>JOIN THE CLUB</h4>
                        <h1>Discover the magic of connecting with someone you never would have met.</h1>
                    </div>
                    <div className="joinclub__right">
                        <h4>Create an account in minutes and get your first meeting scheduled!</h4>
                        <div className="signup__withEmail">
                            <input type="text" placeholder="Enter your email" />
                            <Button classname='bg-primary'>Get Started</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="signup__footer">
                <div className="signup__footerStart">
                    <h4>Careers</h4>
                    <p>WE'RE HIRING</p>
                </div>
                <div className="signup__footerCenter">
                    <a href=""><img src={InstagramIcon} alt="appImage" /></a>
                    <a href=""><img src={TwitterIcon} alt="appImage" /></a>
                    <a href=""><img src={LinkedinIcon} alt="appImage" /></a>
                </div>
                <div className="signup__footerEnd">
                    <p>Privacy</p>
                    <img src={LogoIcon} alt="appImage" />
                </div>
            </div>
        </div>
    )
}

export default Landing
