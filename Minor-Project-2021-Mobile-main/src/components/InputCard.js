import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import firebase from 'firebase'
import { IconButton, TextInput } from 'react-native-paper';
import { db } from '../../utils/firebase';

const InputCard = ({ appUser, user, serverChat }) => {
    const [value, setValue] = useState('');

    const sendMessage = () => {

        if (value.length >= 1) {
            if (appUser && user) {
                const ref = db.collection('Users').doc(appUser.uid).collection('chats').doc("data").collection(user.userData.uid);
                const ref2 = db.collection('Users').doc(user.userData.uid).collection('chats').doc("data").collection(appUser.uid);

                const messageBody = {
                    uid: appUser.uid,
                    username: appUser.displayName,
                    message: value,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
                ref.add(messageBody)
                ref2.add(messageBody)
            }

            setValue("")
        }
    };

    const sendMessageServer = () => {

        if (value.length >= 1) {
            if (appUser) {
                const ref = db.collection('admin').doc("appData").collection('serverChat');

                ref.add({
                    uid: appUser.uid,
                    username: appUser.role !== 'admin' ? `${appUser.displayName.toLowerCase()}${appUser.role === 'mod' ? '(mod)' : ''}` : "admin",
                    photoURL: appUser.photoURL,
                    message: value,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
            }

            setValue("")
        }
    };

    return (
        <View style={styles.inputCard}>
            <TextInput
                style={styles.input}
                label="Type a message"
                value={value}
                onChangeText={text => setValue(text)}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="send"
                onSubmitEditing={() => !serverChat ? sendMessage() : sendMessageServer()}
            />
            {value ?
                <IconButton
                    icon="send"
                    size={30}
                    color={"black"}
                    style={styles.button}
                    onPress={() => !serverChat ? sendMessage() : sendMessageServer()}
                />
                : null}
        </View>
    )
}

export default InputCard

const styles = StyleSheet.create({
    inputCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'whitesmoke'
    },
    input: {
        backgroundColor: 'whitesmoke',
        flex: 1
    },
    emojiPicker: {
        position: "absolute",
        height: 200,
        width: 200,
    },
    button: {
        backgroundColor: 'whitesmoke'
    }
})
