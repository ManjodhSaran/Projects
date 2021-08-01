import React, { useLayoutEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from '../screens/ChatListScreen';
import ChatScreen from '../screens/ChatScreen';
import ServerChatScreen from './ServerChatScreen';

const Stack = createStackNavigator();

const MessengerScreen = ({ route, navigation }) => {

    const [chatScreenActive, setChatScreenActive] = useState(true)

    useLayoutEffect(() =>
        navigation.setOptions({
            tabBarVisible: chatScreenActive
        }), [route, chatScreenActive, navigation])

    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatList" component={ChatListScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} initialParams={{ setChatScreenActive }} />
            <Stack.Screen name="ServerChat" component={ServerChatScreen} initialParams={{ setChatScreenActive }} />
        </Stack.Navigator>
    )
}

export default MessengerScreen