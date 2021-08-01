import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { db } from '../../utils/firebase';
import HomeBox from '../components/HomeBox';
import { ScrollView } from 'react-native-gesture-handler';
import CircularProgress from '../components/CircularProgress';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const RepoListScreen = ({ navigation }) => {
    const [data, setData] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Notes App",
            headerRight: (() => (
                <Button
                    type="clear"
                    icon={<Ionicons name="add" size={32} color="#2089DC" />}
                    onPress={() => navigation.navigate('CreateRepo')}
                />
            ))
        })
    }, [navigation])

    useEffect(() => {
        const fetchData = db.collection("repos").onSnapshot(snapshot => {
            setData(snapshot.docs.map(doc => ({
                repoId: doc.id,
                name: doc.data().name,
                createdBy: doc.data().createdBy,
                isPrivate: doc.data().private,
                isActive: doc.data().active
            })))
        })

        return () => fetchData
    }, [])

    return (
        <SafeAreaView forceInset={{ top: 'always' }} style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {data.length !== 0 ?
                    data.map(({ repoId, name, createdBy, isPrivate, isActive }) =>
                        <HomeBox
                            navigation={navigation}
                            key={`repo__${repoId}`}
                            repoId={repoId}
                            name={name}
                            isPrivate={isPrivate}
                            createdBy={createdBy}
                            isActive={isActive}
                        />
                    )
                    :
                    <CircularProgress />
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default RepoListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
    },
    loading: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',

    }
})
