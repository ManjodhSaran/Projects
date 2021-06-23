import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import Constants from 'expo-constants';
import Stories from '../components/Stories';
import Posts from '../components/Posts';
import FeedHeader from '../components/FeedHeader';

const Feed = () => {

    return (
        <SafeAreaView style={styles.container}>
            <FeedHeader />
            <ScrollView style={styles.scrollView}>
                <Stories />
                <Posts />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Feed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: 'white'
    },
    scrollView: {
    },
})
