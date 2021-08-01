import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import CreateRepoScreen from './CreateRepoScreen'
import RepoListScreen from './RepoListScreen'

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="RepoList" component={RepoListScreen} />
            <Stack.Screen name="CreateRepo" component={CreateRepoScreen} />
        </Stack.Navigator>
    )
}

export default HomeScreen