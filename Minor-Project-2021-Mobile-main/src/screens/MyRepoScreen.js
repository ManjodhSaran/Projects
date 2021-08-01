import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native';
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { repos as reposRef } from '../../utils/firebase';
import MyRepoCard from '../components/MyRepoCard';

import { Context as AuthContext } from '../context/AuthContext';

const MyRepoScreen = ({ navigation }) => {

    const { state } = useContext(AuthContext)
    const { user } = state;

    const [repos, setRepos] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "My Repository",
        });
    }, [navigation])

    useEffect(() => {
        if (user) {
            reposRef.onSnapshot((snapshot) => {
                let arr = [];
                snapshot.docs.map(doc => {
                    if (doc.data().createdBy === user.uid) {
                        arr.push({ id: doc.id, data: doc.data() })
                    }
                })
                setRepos(arr);
            })
        }
    }, [user])

    return (
        <SafeAreaView>
            <ScrollView>
                {repos.map(({ id, data }, i) =>
                    <MyRepoCard
                        key={`app__${data.name}__${i}`}
                        data={data}
                        navigation={navigation}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyRepoScreen

const styles = StyleSheet.create({

})
