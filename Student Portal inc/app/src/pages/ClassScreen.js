import React, { useEffect, useState } from 'react'
import { classesRef } from '../utils/firebase'
import Students from '../components/Students'
import LoadingScreen from './LoadingScreen'
import { Avatar, CardHeader, Paper } from '@material-ui/core'
import '../styles/ClassScreen.scss'

const ClassScreen = ({ classId }) => {
    const [classData, setClassData] = useState(null);

    useEffect(() => {
        if (classId) {
            classesRef.doc(classId).get().then(doc => {
                setClassData(doc.data())
            })
        }
    }, [classId]);

    return (
        <Paper elevation={4} className='classScreen'>
            {classData ?
                <>
                    <CardHeader
                        title={`${classData.class}th-${classData.section.toUpperCase()}
                             ${classData.subject.charAt(0).toUpperCase() + classData.subject.slice(1)}`}
                        subheader=''
                    />
                    <div className="classScreen__body">
                        <Students classData={classData} />
                    </div>
                </>
                :
                <>
                    <LoadingScreen />
                </>
            }
        </Paper>
    )
}

export default ClassScreen
