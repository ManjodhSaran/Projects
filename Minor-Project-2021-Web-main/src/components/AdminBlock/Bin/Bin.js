import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { db } from '../../../utils/firebase';

import './Bin.css'
import BinItem from './BinItem/BinItem';

const Bin = ({ setActive }) => {

    const [binList, setBinList] = useState([]);

    useEffect(() => setActive("bin"), [setActive])

    useEffect(() => {

        db
            .collection("admin")
            .doc("appData")
            .collection("bin")
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot =>
                setBinList(snapshot.docs.map(doc => doc.data()))
            )

    }, []);

    return (
        <div className="bin">
            <div>
                {binList ?
                    binList.map(binItem =>
                        <BinItem key={binItem.doc.id} data={binItem} />
                    )
                    :
                    <CircularProgress />
                }
            </div>
        </div>
    )
}

export default Bin
