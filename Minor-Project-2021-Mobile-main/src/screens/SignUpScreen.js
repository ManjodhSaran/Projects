import React, { useContext, useEffect, useState } from 'react'
import { Linking, StyleSheet, View } from 'react-native'
import { Button, Text, Input } from 'react-native-elements'
import { db } from '../../utils/firebase';
import { Context as AuthContext } from '../context/AuthContext';
import { storeData } from '../functions/asyncStorage';

const SignUpScreen = ({ navigation }) => {

    const [users, setUsers] = useState(null);
    const [foundUser, setFoundUser] = useState(0);

    const { login } = useContext(AuthContext)

    useEffect(() => {
        db.collection('Users')
            .onSnapshot(snapshot =>
                setUsers(snapshot.docs.map(doc => doc.data()))
            )
    }, [])

    const checkUser = (value) => {
        if (value.length === 5) {
            users && users.map(user => {
                const uid = user.uid.slice(user.uid.length - 5)
                if (uid === value.toString()) {
                    storeData('userId', user.uid);
                    login(user);
                }
                setFoundUser(1);
            })
        }
    }


    return (
        <View style={styles.container}>
            <Text h3 style={styles.text}>Sign In</Text>
            {foundUser === 1 ?
                <Text style={{ color: 'red', fontSize: 18, fontWeight: '500' }}>No User Found</Text>
                : null
            }
            <Input
                placeholder="Enter 5-digit Signin Pin"
                onChangeText={text => checkUser(text)}
                secureTextEntry
            />
            <View style={styles.getPin}>
                <Text style={{ fontSize: 18 }}>Don`t have pin,</Text>
                <Button
                    title="Get now."
                    type='clear'
                    onPress={() => { Linking.openURL('https://gne-notes.web.app/login') }}

                />
            </View>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center',
        marginBottom: 200,
        padding: 20
    },
    text: {
        marginVertical: 20
    },
    googleIcon: {
        color: "#fff",
        marginRight: 20
    },
    getPin: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    }
})
