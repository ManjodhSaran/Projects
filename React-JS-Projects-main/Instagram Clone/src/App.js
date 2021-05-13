import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post/Post';
import { Button, Input } from '@material-ui/core';
import { auth, db } from './firebase';
import UploadPost from './UploadPost/UploadPost';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [opneSignIn, setOpenSignIn] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState(null);
  const [signInError, setSignInError] = useState(null);


  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser)

        setOpenSignIn(false)
        setOpen(false)

      } else {
        setUser(null)
      }
    })
  }, [user, username])

  useEffect(() => {

    db.collection('posts').orderBy('timestamp', "desc")
      .onSnapshot(snapshot =>
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          post: doc.data()
        }))))

  }, [])

  const signIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
      .catch(error => setSignInError(error.message))

    // setOpenSignIn(signInError ? true : false)

  }

  const signUp = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => authUser.user.updateProfile({ displayName: username }))
      .catch(error => setSignupError(error.message))

    // setOpen(signupError ? true : false)
  }

  return (
    <div className="app">

      <Modal open={open} onClose={() => setOpen(false)} >
        {
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
              </center>
              {signupError && <p className="app__signupError" id="signupError">{signupError}</p>}
              <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" variant="outlined" color="primary" onClick={signUp}>Sign Up</Button>
            </form>
          </div>
        }
      </Modal>

      <Modal open={opneSignIn} onClose={() => setOpenSignIn(false)} >
        {
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
              </center>
              {signInError && <p className="app__signupError" id="signupError">{signInError}</p>}
              <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" color="secondary" onClick={signIn}>Sign In</Button>
            </form>
          </div>
        }
      </Modal>


      <div className="app__header">
        <img className="app__headerLogo" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
        {user ?
          <Button variant="outlined" size="medium" color="default" onClick={() => auth.signOut()}>Logout</Button>
          :
          <div className="app__headerButtons">
            <Button className="app__headerButton" variant="contained" size="medium" color="primary" onClick={() => setOpen(true)}>Sign Up</Button>
            <Button className="app__headerButton" variant="outlined" size="medium" color="default" onClick={() => setOpenSignIn(true)}>Sign In</Button>
          </div>
        }
      </div>

      <div className="app__posts">
        <div className="app__postsLeft">
          {posts?.map(({ id, post }) =>
            <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} image={post.image} userImage={post.userImage} />
          )}
        </div>



        <div className="app__postsRight">
          <InstagramEmbed
            url='https://www.instagram.com/p/CF4BVvkBR1E/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />
          <InstagramEmbed
            url='https://www.instagram.com/p/CEuOki3sjtW/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => { }}
            onSuccess={() => { }}
            onAfterRender={() => { }}
            onFailure={() => { }}
          />

        </div>
      </div>
      <div className="app__uploadPost">
        {user?.displayName ?
          <UploadPost username={user.displayName} />
          :
          <Button variant="contained" color="primary">Signin To Post</Button>

        }
      </div>

      <div className="app__footer">
        <p>About • Help • Press • API • Jobs • Privacy • Terms • LocationsTop • Accounts • Hashtags • Language</p>
        <h4>© 2020 INSTAGRAM FROM FACEBOOK</h4>
      </div>
    </div>
  );
}

export default App;