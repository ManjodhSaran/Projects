import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const UserBio = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.bio}>Web developer</Text>
            <Text style={styles.bio}>Web developer</Text>
            <Text style={styles.bio}>Web developer</Text>
        </View>
    )
}

export default UserBio

const styles = StyleSheet.create({
    container: {
        paddingStart: 10,
        paddingEnd: 10
    },
    bio: {
        fontWeight: '400',
        alignSelf: 'flex-start'
    },
})
