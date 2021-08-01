import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';

const MesssageCard = ({ appUser, message, serverChat }) => {


    const date = new Date().getDate()
    const date2 = parseInt(message.timestamp?.toDate().toString().substr(8, 2))

    return (
        <View style={appUser.uid === message.uid ? styles.messsageCard__userMessage : styles.messsageCard}>
            {serverChat ?
                <View style={styles.userInfo}>
                    <Avatar.Image style={styles.avatar} size={30} source={{ uri: message?.photoURL ?? "https://p.kindpng.com/picc/s/78-785827_user-profile-avatar-login-account-male-user-icon.png" }} />
                    <Text style={styles.username} h3>{message.username.split(' ')[0]}</Text>
                </View>
                : null}
            <Text h4>{message.message}</Text>
            <Text style={appUser.uid === message.uid ? styles.timestamp__userMessage : styles.timestamp}>
                {message.timestamp?.toDate()?.toTimeString().substr(0, 5)
                    ?
                    `${message.timestamp?.toDate()?.toTimeString().substr(0, 5)}, ${date !== date2 ? message.timestamp?.toDate().toString().substr(0, 10) : 'Today'}`
                    : ""
                }
            </Text>
        </View>
    )
}

export default MesssageCard

const styles = StyleSheet.create({
    messsageCard: {
        backgroundColor: 'lightblue',
        minWidth: 120,
        maxWidth: "35%",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignSelf: 'flex-start',
        marginRight: "auto",
        marginHorizontal: 10,
        marginBottom: 35,
        marginTop: 35
    },
    messsageCard__userMessage: {
        backgroundColor: 'white',
        minWidth: 120,
        maxWidth: "35%",
        borderRadius: 10,
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginLeft: "auto",
        marginHorizontal: 10,
        marginBottom: 35,
        marginTop: 35
    },
    timestamp: {
        left: 0,
        position: 'absolute',
        bottom: -15
    },
    timestamp__userMessage: {
        right: 0,
        position: 'absolute',
        bottom: -15
    },
    userInfo: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        top: -30
    },
    username: {
        fontWeight: '700',
        marginLeft: 5,
    },
})
