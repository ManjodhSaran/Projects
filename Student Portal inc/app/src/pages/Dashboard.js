import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import CreateClass from '../components/CreateClass';
import Header from '../components/Header'
import { selectUser } from '../features/appSlice';
import { auth } from '../utils/firebase';
import MyClasses from '../components/MyClasses';
import ClassScreen from './ClassScreen';
import CustomDrawer from '../components/Drawer';
import '../styles/Dashboard.scss'
import CreateAttendenceSection from '../components/CreateAttendenceSection';

import GridLoader from "react-spinners/GridLoader"
import { Skeleton } from '@material-ui/lab';

const Dashboard = () => {
    const { classId } = useParams()
    const [user, loading, error] = useAuthState(auth);
    const [classesData, setClassesData] = useState([]);
    const userData = useSelector(selectUser);
    const history = useHistory();

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [open, setOpen] = React.useState(false);
    const teacher = userData?.role === 'teacher' ? true : false;
    useEffect(() => {
        if (!user && !loading) {
            history.replace('/');
        }
    }, [user])

    //     const override = css`
    //     display: block;
    //     margin: 0 auto;
    //     border-color: red;
    //   `;

    return (
        <div className='dashboard'>
            <Header setOpen={setOpen} />
            {userData ?
                <>
                    <CustomDrawer setOpen={setOpen} open={open} />
                    <div className="dashboard__body">
                        <div className="dashboard__left">
                            {teacher && <MyClasses classesData={classesData} setClassesData={setClassesData} />}
                            <br />
                            {teacher && classId && <ClassScreen classId={classId} />}
                            {!teacher && <h1>mark attendence </h1>}
                            {!teacher && <h1>submit homework</h1>}
                        </div>
                        <div className="dashboard__right">
                            {teacher &&
                                <CreateClass
                                    expanded={expanded}
                                    setExpanded={setExpanded}
                                />
                            }
                            <br />
                            {teacher &&
                                <CreateAttendenceSection
                                    classesData={classesData}
                                    expanded={expanded}
                                    setExpanded={setExpanded}
                                />
                            }
                        </div>
                    </div>
                </>
                :
                <div className="dashboard__loading">
                    <div>
                        <Skeleton variant="rect" width={500} height={100} animation="wave" />
                        <Skeleton variant="rect" width={500} height={500} animation="wave" />
                    </div>
                    <div>
                        <Skeleton variant="rect" width={500} height={100} animation="wave" />
                        <Skeleton variant="rect" width={500} height={500} animation="wave" />
                    </div>
                    <div>
                        <Skeleton variant="rect" width={500} height={100} animation="wave" />
                        <Skeleton variant="rect" width={500} height={500} animation="wave" />
                    </div>
                </div>
            }
        </div>
    )
}

export default Dashboard
