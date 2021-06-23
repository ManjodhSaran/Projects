import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons';

const EditProfile = () => {
    return (
        <View style={styles.container}>
            <Button style={styles.b1} labelStyle={styles.text} mode="outlined">Edit Profile</Button>
            <Button style={styles.b2} mode="outlined"><Entypo name="chevron-small-down" size={24} color="black" /></Button>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
        height: 38
    },
    b1: {
        flex: 1,
        padding: 0,
        marginRight: 10,
        height: 38
    },
    text: {
        color: 'black',
        textTransform: "capitalize"
    },
    b2: {
        height: 38,
        width: 20
    },
})
