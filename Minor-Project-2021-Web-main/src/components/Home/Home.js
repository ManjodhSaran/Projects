import React, { useEffect, useState } from 'react'
import './Home.css'
import { Button, CircularProgress } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { repos } from '../../utils/firebase';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setRepoId } from '../../features/appSlice';
import HomeBox from './HomeBox/HomeBox';
import { Circle } from "better-react-spinkit"
const Home = (props) => {
    const user = useSelector(selectUser);
    const [data, setData] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            if (user.defaultApp) {
                props.history.action !== "PUSH" && history.push(`/application/${user.defaultApp}`);
                dispatch(setRepoId(user.defaultApp));
            }
        }
    }, [user])
    document.title = "Home || Notes App"
    useEffect(() => {
        repos.get().then(snapshot => {
            setData(snapshot.docs.map(doc => ({ repoId: doc.id, repoName: doc.data().name, createdBy: doc.data().createdBy, isPrivate: doc.data().private, isActive: doc.data().active })))
        })
    }, [])
    return (
        <div className="home">

            <div className="home__container">
                {data.length === 0 ?
                    <Circle color="#1F4562" size={100} />
                    :
                    <>
                        {data.map(({ repoId, repoName, createdBy, isPrivate, isActive }) => <HomeBox key={`app__${repoName}`} repoId={repoId} repoName={repoName} isPrivate={isPrivate} createdBy={createdBy} isActive={isActive} />)}
                        <Link to="/setup application" className="home__box animate__animated animate__backInUp">
                            <Button className="home__button">Create<AddIcon className="home__addIcon" /></Button>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}
export default Home