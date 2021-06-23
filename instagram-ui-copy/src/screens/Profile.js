import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import EditProfile from '../components/EditProfile'
import ProfileHeader from '../components/ProfileHeader'
import UserBio from '../components/UserBio'
import UserInfo from '../components/UserInfo'
import UserPosts from '../components/UserPosts'

const Profile = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ProfileHeader />
            <ScrollView showsHorizontalScrollIndicator={false}>
                <UserInfo />
                <UserBio />
                <EditProfile />
                <UserPosts />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
