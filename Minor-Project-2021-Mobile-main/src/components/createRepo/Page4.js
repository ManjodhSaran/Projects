import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text, Input } from 'react-native-elements';
import { IconButton } from 'react-native-paper';
import { db } from '../../../utils/firebase';

import firebase from 'firebase'
import { SafeAreaView } from 'react-native';

const Page4 = ({ repoId, name, user, makePrivate, navigation, setActivePage }) => {

    useEffect(() => {
        if (!repoId || !name) {
            setActivePage(4)
        }
    }, [name, repoId])


    const handleNext = () => {
        db
            .collection("admin")
            .doc("appData")
            .collection("recents")
            .add({
                name: name,
                repoId: repoId,
                message: `<strong>${user.displayName}</strong> created <strong>${name}</strong> App `,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }).then(() =>
                navigation.navigate('Repo', { repoId: repoId })
            )
    }

    return (
        <SafeAreaView style={styles.container}>
            {makePrivate ?
                <Text h4 style={styles.title}>New <Text style={styles.private}>Private</Text> Repository Created</Text>
                :
                <Text h4 style={styles.title}>New <Text style={styles.public}>Public</Text> Repository Created</Text>
            }
            <Text h4 style={styles.name}>{`${name.toUpperCase().substr(0, 1)}${name.substr(1)}`}</Text>
            <IconButton
                style={styles.button}
                color={'white'}
                icon="arrow-right"
                size={30}
                onPress={handleNext}
            />
        </SafeAreaView>
    )
}

export default Page4

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginBottom: 20,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#03DAC6'
    },
    name: {
        fontWeight: '700',
        color: 'blue',
        marginBottom: 15,
    },
    private: {
        color: 'red'
    },
    public: {
        color: '#03DAC6'
    }
})
