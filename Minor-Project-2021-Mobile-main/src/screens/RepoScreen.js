import React, { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import RightSide from '../components/RightSide';
import Subjects from '../components/Subjects';
import { Ionicons } from '@expo/vector-icons';
import UploadScreen from './UploadScreen';
import { useEffect } from 'react';
import DocViewer from './DocViewer';
import { repos } from '../../utils/firebase';


const Stack = createStackNavigator();

const RepoScreen = ({ route, navigation }) => {

    const { state } = useContext(AuthContext)
    const { user } = state
    const repoId = route?.params?.repoId ?? user.favApp
    const name = repoId.split('-')[1]
    let subjectID = null

    try {
        subjectID = route?.params?.subjectID;
    } catch { err => console.log(err) }

    const [activeSubject, setActiveSubject] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: name || "Repo",
        });
    }, [navigation, name])

    useEffect(() => {
        if (repoId) {
            repos.doc(repoId)
                .get().then((doc) => {
                    if (doc.exists) {
                        !doc.data().active && users.doc(user.uid).set({ defaultApp: null, favApp: null }, { merge: true }).then(() => navigation.navigate('Home'))
                    } else {
                        navigation.navigate('Home')
                    }
                })
        }
    }, [repoId, user]);

    useEffect(() => {
        if (repoId && subjectID) {
            setActiveSubject(subjectID)
        }
    }, [repoId])

    useEffect(() => {
        if (repoId !== activeSubject?.repoId) {
            setActiveSubject(null)
        }
    }, [repoId])

    const RepoComponent = ({ navigation }) => {

        useLayoutEffect(() => {
            navigation.setOptions({
                title: name ? `${name?.charAt(0)?.toUpperCase() + name.slice(1)} • ${activeSubject ? activeSubject.name : ""}` : "No Repo Seleted",
                headerRight: (() => (
                    <Button
                        onPress={() => navigation.navigate('Upload')}
                        title="Upload"
                        icon={<Ionicons name="cloud-upload" size={24} color="#2089DC" />}
                        type="clear"
                    />
                ))
            });
        }, [navigation])

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Subjects repoId={repoId} name={name} activeSubject={activeSubject} user={user} setActiveSubject={setActiveSubject} />
                    <RightSide repoId={repoId} name={name} activeSubject={activeSubject} navigation={navigation} />
                </ScrollView>
            </SafeAreaView>
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen name="RepoC" component={RepoComponent} />
            <Stack.Screen name="Upload" component={UploadScreen} initialParams={{ repoId }} />
            <Stack.Screen name="DocViewer" component={DocViewer} />
        </Stack.Navigator>
    )
}


export default RepoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
