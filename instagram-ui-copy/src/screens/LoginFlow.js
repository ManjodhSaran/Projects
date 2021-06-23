import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Signup';
import Signin from './Signin';
const Stack = createStackNavigator();
const LoginFlow = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Signin" component={Signin} />
        </Stack.Navigator>
    )
}

export default LoginFlow

