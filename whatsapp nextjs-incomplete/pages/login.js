import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src="https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png" />
                <Button onClick={signIn} variant="outline">Sign In with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default Login

const Container = styled.div`
    display:grid;
    place-items:center;
    height:100vh;
    background-color:whitesmoke;
`;
const LoginContainer = styled.div`
    padding:100px;
    display:flex;
    flex-direction:column;
    align-items: center;
    background-color:white;
    border-radius:  5px;
    box-shadow:0px 4px 14px -3px rgba(0,0,0,.7)
`;
const Logo = styled.img`
    width:200px;
    object-fit:contain;
    margin-bottom:50px
`;