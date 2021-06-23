import React from 'react'
import { ImageBackground, Image, StyleSheet, View, Text } from 'react-native'

import { Avatar } from 'react-native-paper';
const StoryCard = ({ size = 75 }) => {
    return (
        <View style={styles.container}>
            <Avatar.Image style={styles.image} size={size} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
        </View>
    )
}

export default StoryCard

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    image: {
        marginRight: 10,
        padding: 5,
        backgroundColor: 'transparent',
    }
})
