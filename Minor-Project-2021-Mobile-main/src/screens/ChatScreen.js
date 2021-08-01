import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, BackHandler, SafeAreaView, ScrollView } from 'react-native'

import { Text } from "react-native-elements"

import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { Context as AuthContext } from '../context/AuthContext';
import { db } from '../../utils/firebase';
import MesssageCard from '../components/MesssageCard';
import InputCard from '../components/InputCard';
import CircularProgress from '../components/CircularProgress';

const ChatScreen = ({ navigation, route }) => {
    const { setChatScreenActive } = route.params

    const { state } = useContext(AuthContext)
    const appUser = state.user
    const { user } = route.params

    const scrollViewRef = useRef();

    const [messages, setMessages] = useState(null);
    const [activeHeaderMenu, setActiveHeaderMenu] = useState(false);

    useEffect(() => {
        setChatScreenActive(false);

    }, [route, navigation])


    useEffect(() => {
        const unsubscribe = () => !user && navigation.navigate('ChatList');

        return () => unsubscribe()
    }, [navigation])

    useEffect(() => {
        const fetchMessages = db
            .collection('Users').doc(appUser.uid)
            .collection('chats').doc("data")
            .collection(user.userData.uid).orderBy("timestamp", 'asc')
            .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())))

        return () => fetchMessages
    }, [])

    useEffect(() => {

        // Add event listener for hardware back button press on Android
        BackHandler.addEventListener("hardwareBackPress", () => setChatScreenActive(true));

        return () =>
            // clear/remove event listener
            BackHandler.removeEventListener("hardwareBackPress", () => setChatScreenActive(true));
    }, []);


    const deleteChat = () => {
        if (appUser && user) {
            const ref = db.collection('Users').doc(appUser.uid).collection('chats').doc("data").collection(user.userData.uid);

            ref.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                }).then(() => setActiveHeaderMenu(false))
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: (() =>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.headerBackIcon} onPress={() => { navigation.navigate('ChatList'); setChatScreenActive(true) }}>
                        <Ionicons name="arrow-back-outline" size={32} color="black" />
                        <Avatar.Image style={styles.headerAvatar} size={30} source={{ uri: user.userData.photoURL }} />
                    </TouchableOpacity>
                    <Text h4>{user.userData.displayName}</Text>
                </View>
            ),
            headerRight: (() =>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerMenuIcon} onPress={() => setActiveHeaderMenu(!activeHeaderMenu)}>
                        <Ionicons name="ellipsis-vertical-outline" size={24} color="black" />
                    </TouchableOpacity>
                    {activeHeaderMenu ?
                        <View style={styles.headerMenu}>
                            <TouchableOpacity onPress={deleteChat} style={styles.headerMenu__option} >
                                <Text>Delete Chat</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                    }
                </View>
            )

        });
    }, [navigation, activeHeaderMenu])

    return (
        <SafeAreaView style={styles.chat}>
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                style={styles.messages}>
                {messages ?
                    messages.map((message, index) =>
                        <MesssageCard appUser={appUser} message={message} key={message.uid + index} />
                    )
                    :
                    <CircularProgress />
                }
            </ScrollView>
            <InputCard appUser={appUser} user={user} />
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    headerAvatar: {
        marginRight: 8
    },
    headerBackIcon: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    headerRight: {
        marginRight: 10,
    },
    headerMenu: {
        position: 'absolute',
        padding: 10,
        width: 120,
        right: 35,
        top: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#fff',
        elevation: 5
    },
    headerMenu__option: {
        padding: 5
    },
    chat: {
        flexDirection: 'column',
        marginTop: 0,
        justifyContent: 'space-between',
        flex: 1
    },
    headerMenuIcon: {
        padding: 5
    },
    loading: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    messages: {
        marginVertical: 5,
        paddingHorizontal: 15,
        width: "100%",
        // flex: 0.5,
    }
})
