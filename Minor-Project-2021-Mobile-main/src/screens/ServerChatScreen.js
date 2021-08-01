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

const ServerChatScreen = ({ navigation, route }) => {
    const { setChatScreenActive } = route.params

    const { state } = useContext(AuthContext)
    const appUser = state.user

    const scrollViewRef = useRef();

    useEffect(() =>
        setChatScreenActive(false)
        , [route, navigation])

    const [messages, setMessages] = useState(null);

    useEffect(() => {
        if (appUser) {
            db.collection('admin').doc("appData")
                .collection('serverChat').orderBy("timestamp", 'asc')
                .onSnapshot(snapshot =>
                    setMessages(snapshot.docs.map(doc => doc.data()))
                )
        }
    }, []);

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", () => setChatScreenActive(true));

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", () => setChatScreenActive(true));
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: (() =>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.headerBackIcon} onPress={() => { navigation.navigate('ChatList'); setChatScreenActive(true) }}>
                        <Ionicons name="arrow-back-outline" size={32} color="black" />
                        <Avatar.Image style={styles.headerAvatar} size={30} source={{ uri: 'https://image.flaticon.com/icons/png/512/1428/1428190.png' }} />
                    </TouchableOpacity>
                    <Text h4>Server Chat</Text>
                </View>
            ),
        });
    }, [navigation])

    // const deleteChat = () => {
    //     if (user) {
    //         const ref = db.collection('admin').doc("appData").collection('serverChat');

    //         ref.get()
    //             .then((querySnapshot) => {
    //                 querySnapshot.forEach((doc) => {
    //                     doc.ref.delete();
    //                 });
    //             });
    //     }
    // }

    return (
        <SafeAreaView style={styles.chat}>
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                style={styles.messages}>
                {messages ?
                    messages.map((message, index) =>
                        <MesssageCard appUser={appUser} message={message} key={message.uid + index} serverChat />
                    )
                    :
                    <CircularProgress />
                }
            </ScrollView>
            <InputCard appUser={appUser} serverChat />
        </SafeAreaView>
    )
}

export default ServerChatScreen

const styles = StyleSheet.create({
    messages: {
        paddingTop: 10,
        marginTop: 10,

    },
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
    chat: {
        flexDirection: 'column',
        marginTop: 0,
        justifyContent: 'space-between',
        flex: 1
    },
    loading: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    messages: {
        // flex: 1
        width: "100%",
        // flex: 0.5,
    }
})
