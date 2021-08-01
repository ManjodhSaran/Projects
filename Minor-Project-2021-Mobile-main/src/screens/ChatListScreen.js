import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'
import { Text } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import { rdb } from '../../utils/firebase';
import ChatCard from '../components/ChatCard';
import CircularProgress from '../components/CircularProgress';


const ChatListScreen = ({ navigation }) => {

    const { state } = useContext(AuthContext)
    const appUser = state.user;

    useLayoutEffect(() =>
        navigation.setOptions({
            title: "Messenger"
        })
        , [navigation])

    const [online, setOnline] = useState([]);
    const [activeManager, setActiveManager] = useState(null);

    useEffect(() => {
        const rdbRef = rdb.ref('/onlineUsers/');
        rdbRef.on('value', (snapshot) => {
            const data = snapshot.val();
            setOnline(Object.keys(data).map(key => data[key]))
        });
    }, [appUser]);

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {online.length !== 0 ?
                    <>
                        <ChatCard serverChatCard navigation={navigation} />
                        {online.map((user, index) =>
                        (user.userData.uid !== appUser.uid ?
                            <ChatCard
                                // query={query} 
                                index={index}
                                key={user.userData.uid}
                                user={user}
                                navigation={navigation}
                            />
                            : null)
                        )}
                    </>
                    :
                    <CircularProgress />

                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChatListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        // position: 'relative',
        width: "100%",
        // flex: 0.5,
    },
    header: {
        borderBottomWidth: 1,
        borderColor: "black",
        paddingVertical: 2,
        paddingHorizontal: 5
    },
})
