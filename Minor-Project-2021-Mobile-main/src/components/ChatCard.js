import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Text } from "react-native-elements"

const ChatCard = ({ user, navigation, serverChatCard }) => {
    return (
        !serverChatCard ?
            <TouchableOpacity
                style={styles.chatCard}
                onPress={() => navigation.navigate('Chat', { user })}>
                <Avatar.Image size={30} source={{ uri: user.userData.photoURL }} />
                <Text style={styles.name}>{user.userData.displayName}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
                style={styles.chatCard}
                onPress={() => navigation.navigate('ServerChat')}>
                <Avatar.Image size={30} source={{ uri: 'https://image.flaticon.com/icons/png/512/1428/1428190.png' }} />
                <Text style={styles.name}>Server Chat</Text>
            </TouchableOpacity>
    )
}

export default ChatCard

const styles = StyleSheet.create({
    chatCard: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderBottomColor: "black",
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',

    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        textTransform: "capitalize",
        marginLeft: 25
    }
})
