import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Context as AuthContext } from './src/context/AuthContext';
import { Provider as AuthProvider } from './src/context/AuthContext';

import { Avatar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SignUpScreen from './src/screens/SignUpScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RepoScreen from './src/screens/RepoScreen';
import SplashScreen from './src/screens/SplashScreen';
import MessengerScreen from './src/screens/MessengerScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

  const { state } = useContext(AuthContext)
  // console.log(state.user)

  return (
    <NavigationContainer>
      <StatusBar theme="light" />
      {!state.user ?
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
        :
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              } else if (route.name === 'Repo') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Messenger') {
                iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              }

              return route.name === 'Profile' ?
                <Avatar.Image size={size} source={{ uri: state.user.photoURL }} />
                :
                <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#2089DC',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Repo" component={RepoScreen} />
          <Tab.Screen name="Messenger" component={MessengerScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      }
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
};