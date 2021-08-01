import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import { Image, Input, Button } from 'react-native-elements'
import { db } from '../../utils/firebase';

const SignInScreen = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {

    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Image
                style={{ width: 200, height: 200 }}
                source={{
                    uri: 'https://pbs.twimg.com/profile_images/758084549821730820/_HYHtD8F.jpg',
                }}
            />
            <View style={styles.signInForm}>
                <Input
                    style={styles.signInFormInput}
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholder="College Roll No"
                    autoFocus
                />
                <Input
                    style={styles.signInFormInput}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password"
                    onSubmitEditing={signIn}
                />
                <Button
                    style={styles.signInFormButton}
                    title="Sign In"
                    onPress={signIn}
                    type="solid"
                />
            </View>
            <View style={{ height: 100 }}></View>
        </KeyboardAvoidingView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white",
    },
    signInForm: {
        width: 300,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: "white",
    },
    signInFormInput: {
        borderBottomColor: "yellow",
    },
    signInFormButton: {
        width: 100,
        marginTop: 10,
    }
})
