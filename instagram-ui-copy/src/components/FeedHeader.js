import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import logo from '../assets/logo.png'

const FeedHeader = () => {
    return (
        <View style={styles.container}>
            <Button
                type="clear"
                icon={<Ionicons name="add" size={24} color="black" />}
            />
            <Image source={logo} style={styles.image} />
            <Button
                type="clear"
                icon={<FontAwesome5 name="facebook-messenger" size={24} color="black" />}
            />
        </View>
    )
}

export default FeedHeader

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 50,
    },
    image: {
        width: 200,
        resizeMode: 'contain',
        height: 50,
    }
})
