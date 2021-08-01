import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'

import Page1 from '../components/createRepo/Page1';
import Page4 from '../components/createRepo/Page4';

import { Context as AuthContext } from '../context/AuthContext';

const CreateRepoScreen = ({ navigation }) => {

    const { state } = useContext(AuthContext);
    const { user } = state;

    const [name, setName] = useState("");
    const [repoId, setRepoId] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [makePrivate, setMakePrivate] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "New Repository"
        })
    }, [navigation])

    useEffect(() => {
        setRepoId(`${user.uid}-${name}`)
    }, [name])

    return (
        <SafeAreaView style={styles.createRepo}>
            <View style={styles.container}>
                {activePage === 1 ? <Page1 repoId={repoId} makePrivate={makePrivate} setMakePrivate={setMakePrivate} name={name} user={user} setName={setName} setActivePage={setActivePage} user={user} /> : null}
                {activePage === 4 ? <Page4 repoId={repoId} makePrivate={makePrivate} name={name} setActivePage={setActivePage} navigation={navigation} user={user} /> : null}
            </View>
        </SafeAreaView>
    )
}

export default CreateRepoScreen

const styles = StyleSheet.create({
    createRepo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '95%',
        margin: 10,
        borderRadius: 20,
        padding: 8,
        backgroundColor: '#fff'
    }
})
