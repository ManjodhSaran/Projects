import React, { useState } from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Input } from '@material-ui/core';
import { db } from '../../../utils/firebase';


const Page2 = ({ setActivePage, name }) => {

    const [error, setError] = useState(null);

    const [branch, setBranch] = useState("")
    const [year, setYear] = useState("")
    const [sem, setSem] = useState("")
    const [noOfSubjects, setNoOfSubjects] = useState("")


    document.title = "Set up App Info || Notes App"

    const handleNext = (event) => {
        event.preventDefault();

        setError(null);

        if (name !== "" && branch !== "" && sem !== "" && year !== "" && noOfSubjects !== "") {
            db
                .collection("apps")
                .doc(name)
                .set(
                    {
                        branch: branch,
                        year: year,
                        sem: sem,
                        noOfSubjects: noOfSubjects,
                    },
                    { merge: true }
                ).then(() => setActivePage(3), [])
        } else {
            !name && setActivePage(1)
            !noOfSubjects && setError("Set no of Subject.")
            !sem && setError("Enter Semester .")
            !year && setError("Enter Year.")
            !branch && setError("Branch name Too Short.")
        }

    }

    return (

        <div className="setupApp__page2  animate__animated animate__flipInX">
            <form>
                {error && <p className="setupApp__error">{error}</p>}
                <Input className="setupPage__formInput" value={branch} onChange={(e) => setBranch(e.target.value)} type="text" placeholder="Branch(cse,it,...)" />
                <Input className="setupPage__formInput" value={year} onChange={(e) => setYear(e.target.value)} type="text" placeholder="Year(1,2,3,4)" />
                <Input className="setupPage__formInput" value={sem} onChange={(e) => setSem(e.target.value)} type="text" placeholder="Semester" />
                <Input className="setupPage__formInput" value={noOfSubjects} onChange={(e) => setNoOfSubjects(e.target.value)} type="text" placeholder="No of Subjects" />
                <button onClick={handleNext} className="setupPage__formButton"><ArrowForwardIcon className="setupPage__formIcon" /></button>
            </form>
        </div>
    )
}

export default Page2
