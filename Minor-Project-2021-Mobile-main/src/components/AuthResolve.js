import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { View } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { getData } from '../functions/asyncStorage';
import { db } from '../../utils/firebase';

const AuthResolve = () => {

    const { login } = useContext(AuthContext)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        if (!userId) {
            getData('userId').then(res => setUserId(res))
        }
    }, [])

    useEffect(() => {
        const unsubscribe = userId ? db.collection('Users').doc(userId).get().then(res => login(res.data())) : null

        return () => unsubscribe
    }, [userId])

    return (<View></View>)
}

export default AuthResolve