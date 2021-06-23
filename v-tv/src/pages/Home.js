import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    return (
        <div>
            <Button onClick={() => history.push('/signup')}>Get Started</Button>
        </div>
    )
}

export default Home
