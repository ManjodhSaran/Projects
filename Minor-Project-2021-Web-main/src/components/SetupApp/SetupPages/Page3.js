import React, { useEffect, useState } from 'react'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Input } from '@material-ui/core';
import { db, repos } from '../../../utils/firebase';
import firebase from 'firebase'

const Page3 = ({ setActivePage, name }) => {

    const [error, setError] = useState(null);

    const [data, setData] = useState({});
    const [arraySize, setArraySize] = useState(0);

    document.title = "Set up Subjects || Notes App";

    useEffect(() => {
        if (name) {
            const ref = repos.doc(name);

            ref.get().then((doc) => {
                if (doc.exists) {
                    setArraySize(parseInt(doc.data().noOfSubjects))
                } else {
                    console.log("no such data")
                }
            })
        }
    }, [name])

    const handleNext = (event) => {
        event.preventDefault();

        setError(null);

        if (name !== "" && data) {
            const ref = repos.doc(name).collection("subjects")
            for (let i = 1; i <= arraySize; i++) {

                // if (i > 1) {
                //     if (data[`name${i}`] == data[`name${i - 1}`]) {
                //         setError("Data field can`t have same values")
                //     }
                //     if (data[`id${i}`] == data[`id${i - 1}`]) {
                //         setError("Data field can`t have same values")
                //     }
                // }

                if (!error) {
                    if (data[`name${i}`] && data[`id${i}`]) {
                        ref.doc(`subject__info__${i}`).set({
                            name: data[`name${i}`],
                            id: data[`id${i}`],
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        })

                        if (i === arraySize) {
                            setActivePage(4)
                        }
                    } else {
                        setError("Something missing, check values and retry")
                    }
                }

            }


        } else {
            !name && setActivePage(1)
        }

    }

    return (
        <div className="setupApp__page3  animate__animated animate__flipInX">
            <h5>Add Subjects</h5>

            {error && <p className="setupApp__error">{error}</p>}
            <form id="subjectForm">
                {arraySize !== 0 && [...Array(arraySize)].map((e, i) =>
                    <div key={`subject__input__${i}`} className="subjectForm__inputs">
                        <Input
                            className="setupPage__formInputName"
                            type="text"
                            placeholder={`Subject ${i + 1} Name`}
                            onChange={e => setData({ ...data, [`name${i + 1}`]: e.target.value })}
                        />
                        <Input
                            className="setupPage__formInputID"
                            type="text"
                            placeholder={`subject ${i + 1} id`}
                            onChange={e => setData({ ...data, [`id${i + 1}`]: e.target.value })}
                        />
                    </div>
                )}
                <button onClick={handleNext} className="setupPage__formButton"><ArrowForwardIcon className="setupPage__formIcon" /></button>

            </form>

        </div>
    )
}

export default Page3
