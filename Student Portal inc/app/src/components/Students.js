import React, { useEffect, useState } from 'react'
import { studentsRef } from '../utils/firebase'
import { useCollectionOnce } from 'react-firebase-hooks/firestore';

import ScaleLoader from "react-spinners/ScaleLoader";

import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'rollno', headerName: 'Roll No.', width: 128 },
    { field: 'name', headerName: 'Name', width: 200 },
];



const Students = ({ classData }) => {
    const classCode = `${classData?.class}${classData?.section?.toLowerCase()}`
    const [students, setStudents] = useState([])
    const [snapshot, loading, error] = useCollectionOnce(
        studentsRef.where('classCode', '==', classCode)
    );

    useEffect(() => {
        snapshot && setStudents(snapshot.docs.map(student => ({ ...student.data(), rollno: parseInt(student.data().rollno) })))
    }, [snapshot]);

    return (
        <div className="students">
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={students} columns={columns} pageSize={10} checkboxSelection />
            </div>
            {loading &&
                <div className="loadingContainer1">
                    <ScaleLoader />
                </div>
            }
        </div>
    )
}

export default Students
