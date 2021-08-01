import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from "react-native-elements"
import { Button } from 'react-native-elements';
import { repos as reposRef } from '../../utils/firebase';

const MyRepoCard = ({ data, navigation }) => {
    const repoId = data.repoId
    const deleteApp = () => reposRef.doc(repoId).set({ active: false }, { merge: true });
    const restoreApp = () => reposRef.doc(repoId).set({ active: true }, { merge: true });
    const makePrivate = () => reposRef.doc(repoId).set({ private: true }, { merge: true });
    const makePublic = () => reposRef.doc(repoId).set({ private: false }, { merge: true });
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text h2>{data.name}</Text>
                <Button type='clear' onPress={() => navigation.navigate('Repo', { app: data.name })} title="Go to App" />
            </View>
            <Text style={styles.text2}>Made on: {data.madeOn?.toDate().toDateString()}</Text>
            <View style={styles.buttons}>
                {data.private ?
                    <Button buttonStyle={{ width: 150 }} onPress={makePublic} title="Make Public" />
                    :
                    <Button buttonStyle={{ width: 150 }} onPress={makePrivate} title="Make Private" />
                }
                {data.active ?
                    <Button type="outline" titleStyle={{ color: 'red' }} buttonStyle={{ borderColor: 'red', width: 150 }} onPress={deleteApp} title="Delete App" />
                    :
                    <Button buttonStyle={{ width: 150 }} type="outline" onPress={restoreApp} title="Restore App" />
                }
            </View>
        </View>
    )
}

export default MyRepoCard

const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 5,
        elevation: 1,
    },
    text2: {
        fontSize: 16,
        fontWeight: '700'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    }
})