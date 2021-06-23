import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UserPosts = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons name="grid" size={24} color="black" />
                <Feather name="user" size={24} color="black" />
            </View>
            <View style={styles.posts}>
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
            </View>
        </View>
    )
}

export default UserPosts

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1
    },
    posts: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 2
    },
    image: {
        minWidth: ((Dimensions.get('window').width - 4) / 3),
        height: 120,
        marginBottom: 2
    }
})
