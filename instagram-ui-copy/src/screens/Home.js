import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Feed from './Feed';
import NewPost from './NewPost';
import Messenger from './Messenger';
const Stack = createStackNavigator();

const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
            <Stack.Screen name="NewPost" component={NewPost} options={{ headerShown: false }} />
            <Stack.Screen name="Messenger" component={Messenger} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Home

