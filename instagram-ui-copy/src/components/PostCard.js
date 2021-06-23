import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import StoryCard from './StoryCard'
import { Ionicons, Feather, Entypo } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

const PostCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <StoryCard size={35} />
                    <Text style={styles.headerText}>{'Manjodh Singh'}</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <Image style={styles.image} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
            <View style={styles.actions}>
                <View style={styles.actionsLeft}>
                    <TouchableOpacity style={styles.icon}><Ionicons name="heart" size={24} color="red" /></TouchableOpacity>
                    <TouchableOpacity style={styles.icon}><Ionicons name="chatbubble-outline" size={24} color="black" /></TouchableOpacity>
                    <TouchableOpacity style={styles.icon}><Feather name="send" size={24} color="black" /></TouchableOpacity>
                </View>
                <View style={styles.actionsMid}>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                </View>
                <View style={styles.actionsRight}>
                    <TouchableOpacity style={styles.icon}><Feather name="bookmark" size={24} color="black" /></TouchableOpacity>
                </View>
            </View>
            <Text style={styles.likes}>{'346,164'} likes</Text>
            <View style={styles.username}>
                <Text style={styles.name}>{'Manjodh Singh'}</Text>
                <Text style={styles.caption}>{'Lorem ipsum dolor...'}</Text>
            </View>
            <View style={styles.comment}>
                <Avatar.Image style={styles.commentAvatar} size={28} source={{ uri: 'https://reactjs.org/logo-og.png' }} />
                <TextInput
                    style={styles.commentInput}
                    placeholder='Add a comment...'
                />
            </View>
            <Text style={styles.time}>5 hours ago</Text>

        </View>
    )
}

export default PostCard

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    headerText: {
        fontWeight: '700',
        marginStart: 8,
        paddingTop: 7,
    },
    image: {
        height: 370,
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingStart: 5,
        paddingEnd: 5
    },
    icon: {
        padding: 5,
    },
    actionsLeft: {
        display: 'flex',
        flexDirection: 'row',
        width: 100,
    },
    actionsMid: {
    },
    actionsRight: {
        display: 'flex',
        flexDirection: 'row-reverse',
        width: 100,
    },
    likes: {
        paddingStart: 10,
        paddingEnd: 10,
        fontWeight: '600'
    },
    username: {
        display: 'flex',
        flexDirection: 'row',
        paddingStart: 10,
        paddingEnd: 10,
    },
    name: {
        fontWeight: '600',
        marginRight: 7
    },
    comment: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 10,
        paddingEnd: 10,
    },
    commentAvatar: {
        backgroundColor: 'transparent',
        marginBottom: 5,
        marginTop: 5,
    },
    commentInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        marginStart: 8,
    },
    time: {
        paddingStart: 10,
        paddingEnd: 10,
        fontWeight: '400',
        fontSize: 9,
        color: 'grey'
    }
})
