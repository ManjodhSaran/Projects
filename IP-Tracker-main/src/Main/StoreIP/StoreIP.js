import React, { useEffect } from 'react'
import firebase from 'firebase'
import db from '../../firebase'
const publicIp = require('public-ip')

const StoreIP = ({ IP, setIP, geo, setGeo }) => {

    useEffect(() => {
        (async () => {
            setIP(await publicIp.v4());
        })();
    }, [IP, setIP])

    useEffect(() => {
        fetch(`https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572/${IP}`)
            .then(response => response.json())
            .then(data => setGeo(data));
    }, [IP])

    useEffect(() => {
        geo && IP &&
            db
                .collection("IPs")
                .doc(IP)
                .set(
                    {
                        IP: IP,
                        geoLocation: geo,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }
                )
    }, [IP, geo])


    return (<div></div>)
}

export default StoreIP
