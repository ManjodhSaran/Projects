import { List, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';
import { classesRef } from '../utils/firebase'
import ScaleLoader from "react-spinners/ScaleLoader";
import ClassCard from './ClassCard';
import CustomAccordion from './ui/Accordion'

const MyClasses = ({ classesData, setClassesData }) => {

    const userData = useSelector(selectUser);

    const staffId = userData?.staffId || " ";

    const [value, loading, error] = useCollection(
        classesRef.where('staffId', '==', staffId),
        { snapshotListenOptions: { includeMetadataChanges: true } }
    );

    useEffect(() => {
        value && setClassesData(value.docs.map(doc => doc.data()))
    }, [value]);

    return (
        <div className="myClasses">
            <CustomAccordion
                title={<h4>My Classes</h4>}
                component={
                    loading ?
                        <ScaleLoader />
                        :
                        <div className="myClasses__content">
                            {classesData.map(classData =>
                                <ClassCard
                                    key={classData.id}
                                    className='classCard'
                                    id={classData.id}
                                    classData={classData}

                                />
                            )}
                        </div>
                }
            />

        </div>
    )
}

export default MyClasses
