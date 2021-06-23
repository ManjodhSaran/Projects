import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { appData } from '../../utils/firebase';
import './Subjects.css'

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        appData.onSnapshot(snapshot => setSubjects(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))))
    }, []);

    const addSubject = () => {
        const name = prompt("Enter Subject Name: ")
        if (name) {
            appData.add({ name })
        }
    };

    return (
        <div className="subjects">
            {subjects.map(({ id, data }) =>
                <Link
                    className="subject"
                    key={`/application/${id}/${data.name}`}
                    to={`/application/${id}/${data.name}`}>
                    <h3>{data.name}</h3>
                </Link>
            )}

            <div onClick={addSubject} className="subject subject-add">
                <h3>Add</h3>
            </div>
        </div>
    )
}

export default Subjects
