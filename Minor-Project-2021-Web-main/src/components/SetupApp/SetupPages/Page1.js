import { Checkbox, FormControlLabel, Input } from '@material-ui/core'
import React, { useState } from 'react'

import firebase from 'firebase'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { repos } from '../../../utils/firebase';
import { selectUser } from '../../../features/appSlice';
import { useSelector } from 'react-redux';

const Page1 = ({ setActivePage, repoId, name, setName, user, makePrivate, setMakePrivate }) => {

    const [error, setError] = useState(null);

    document.title = "Set up App Name || Notes App"

    const handleNext = (event) => {
        event.preventDefault();

        setError(null);

        if (name !== "" && repoId !== "") {
            const ref = repos.doc(repoId)

            const createApp = () => {
                ref.set(
                    {
                        name: name,
                        repoId: repoId,
                        createdBy: user.uid,
                        createdByName: user.displayName,
                        private: makePrivate,
                        madeOn: firebase.firestore.FieldValue.serverTimestamp(),
                        active: true
                    }
                ).then(() => setActivePage(4))
            }

            ref.get().then(doc => {
                if (doc.exists) {
                    if (window.confirm(`Name already taken by you\n'${name}' already in use.\nPress continue to overwrite previous version of repo.`)) {
                        createApp();
                    }
                } else {
                    createApp();
                }
            })

        } else {
            setError("Repo Name Too Short.")
        }
    }

    return (
        <div className="setupApp__page1 animate__animated animate__flipInX">
            <div className="setupApp__header">
                <h2>Create New Repo</h2>
            </div>
            <form className="setupApp__page1Form" >
                <h5>Repo Name</h5>
                {error && <p className="setupApp__error">{error}</p>}
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="write here..." />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={makePrivate}
                            onChange={() => setMakePrivate(!makePrivate)}
                            name="makePrivate"
                            color="primary"
                        />
                    }
                    label="Make Private"
                />
                <button onClick={handleNext} className="setupPage__formButton"><ArrowForwardIcon className="setupPage__formIcon" /></button>
            </form>
        </div>
    )
}

export default Page1
