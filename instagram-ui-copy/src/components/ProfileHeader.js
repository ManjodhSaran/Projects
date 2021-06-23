import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const ProfileHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ManjodhSaran39</Text>
            <View style={styles.icons}>
                <Ionicons name="add-outline" size={24} color="black" />
                <Ionicons name="menu" size={24} color="black" />
            </View>
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    text: {
        fontWeight: '600'
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '13%'
    },
})
