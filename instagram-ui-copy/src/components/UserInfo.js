import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper'

const UserInfo = () => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Avatar.Image style={styles.avatar} size={65} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <Text style={styles.name}>Manjodh Singh</Text>
            </View>
            <View style={styles.right}>
                <View style={styles.rightInfo}>
                    <Text style={styles.top}>2</Text><Text style={styles.bottom}>Posts</Text>
                </View>
                <View style={styles.rightInfo}>
                    <Text style={styles.top}>263</Text><Text style={styles.bottom}>Followers</Text>
                </View>
                <View style={styles.rightInfo}>
                    <Text style={styles.top}>270</Text><Text style={styles.bottom}>Following</Text>
                </View>
            </View>
        </View>
    )
}

export default UserInfo

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 0,

    },
    left: {
        display: 'flex',
        alignItems: 'center',
    },
    name: { fontWeight: '600' },

    right: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
    },
    rightInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    top: {
        fontWeight: '600',
        fontSize: 18
    },
    bottom: {
        fontSize: 14,
        marginTop: -5

    },
})
