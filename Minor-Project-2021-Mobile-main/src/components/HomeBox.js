import React, { useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { Context as AuthContext } from '../context/AuthContext';
import FadeInView from './animated/FadeInView';
import { db } from '../../utils/firebase';

const HomeBox = ({ navigation, repoId, name, createdBy, isPrivate, isActive }) => {

    const { state } = useContext(AuthContext)
    const { user } = state
    const [starred, setStarred] = useState(false);

    useEffect(() => {
        const unsubscribe = user ? (user.favApp === repoId ? setStarred(true) : null) : null;

        return () => unsubscribe;
    }, [user, repoId])

    const handleStar = () => {
        if (user) {
            if (!starred) {
                db
                    .collection("Users")
                    .doc(user.uid)
                    .set(
                        { favApp: repoId },
                        { merge: true }
                    ).then(() => setStarred(true))
            } else {
                db
                    .collection("Users")
                    .doc(user.uid)
                    .set(
                        { favApp: null },
                        { merge: true }
                    ).then(() => setStarred(false))
            }
        }
    }

    return (
        <FadeInView duration={1000}>
            <TouchableOpacity onPress={() => navigation.navigate('Repo', { repoId })}>
                <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.box}
                    end={{ x: 0, y: 1 }}
                    start={{ x: 1, y: 0 }}
                >
                    <Text style={styles.h1}>{name}</Text>
                    <TouchableOpacity>
                        <AntDesign name={!starred ? "staro" : "star"} onPress={handleStar} size={24} color="#FED701" />
                    </TouchableOpacity>
                </LinearGradient>
            </TouchableOpacity>
        </FadeInView>
    )
}

export default HomeBox

const styles = StyleSheet.create({
    box: {
        padding: 20,
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: 'space-between',
        elevation: 5
    },
    h1: {
        color: '#fff',
        textTransform: 'capitalize'
    }
})
