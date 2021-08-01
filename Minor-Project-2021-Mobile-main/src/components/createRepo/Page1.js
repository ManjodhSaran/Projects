import firebase from 'firebase'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Input } from 'react-native-elements';
import { IconButton } from 'react-native-paper';
import { repos } from '../../../utils/firebase';
import Error from '../Error';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import { Alert } from 'react-native';


const Page1 = ({ setActivePage, repoId, name, setName, user, makePrivate, setMakePrivate }) => {

    const [error, setError] = useState(null);

    const handleSubmit = () => {

        if (repoId !== "" && name !== '') {
            const ref = repos.doc(repoId)

            const createApp = () =>
                ref.set({
                    name: name,
                    repoId: repoId,
                    createdBy: user.uid,
                    createdByName: user.displayName,
                    private: makePrivate,
                    active: true,
                    madeOn: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => setActivePage(4))

            ref.get().then(doc => {
                if (doc.exists) {
                    Alert.alert(
                        "Name already taken by you",
                        `'${name}' already in use.\nPress continue to overwrite previous version of repo.`,
                        [
                            {
                                text: "Cancel",
                                style: "cancel"
                            },
                            {
                                text: "Continue",
                                onPress: createApp
                            }
                        ],
                        { cancelable: false }
                    );
                } else {
                    createApp();
                }
            })

        } else {
            setError("App Name Too Short.")
        }

    }
    return (
        <View style={styles.container}>
            <Text h3 style={styles.title}>Repo Name</Text>
            {error ? <Error message={error} /> : null}
            <Input
                placeholder="Write Here..."
                value={name}
                style={styles.input}
                onChangeText={text => setName(text)}
                autoCapitalize="none"
                autoCorrect={false}

            />
            <Button
                title="Make Private"
                type="clear"
                icon={makePrivate ?
                    <MaterialCommunityIcons name="checkbox-intermediate" size={24} color="black" />
                    :
                    <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
                }
                onPress={() => setMakePrivate(!makePrivate)}
            />
            <IconButton
                style={styles.button}
                icon="arrow-right"
                size={30}
                color={"white"}
                onPress={handleSubmit}
            />
        </View>
    )
}

export default Page1

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#03DAC6'
    }
})
