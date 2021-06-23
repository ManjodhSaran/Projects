import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PostCard from './PostCard'

const Posts = () => {
    return (
        <View style={styles.container}>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        </View>
    )
}

export default Posts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
})
