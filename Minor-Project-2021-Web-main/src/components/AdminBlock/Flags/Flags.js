import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { db } from '../../../utils/firebase';

import FlagCard from './FlagCard/FlagCard';
import './Flags.css'
const Flags = ({ setActive }) => {

    const [data, setData] = useState("");

    useEffect(() => {
        db
            .collection("admin")
            .doc("appData")
            .collection("flags")
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot =>
                setData(snapshot.docs.map(doc => ({
                    documentID: doc.id,
                    data: doc.data()
                })))
            )

    }, []);

    useEffect(() => setActive("flags"), [setActive])

    return (
        <div className="flags">
            {data ?
                data.map(({ documentID, data }) =>
                    <FlagCard key={documentID} documentID={documentID} doc={data} />
                )
                :
                <CircularProgress />
            }
        </div>
    )
}

export default Flags
