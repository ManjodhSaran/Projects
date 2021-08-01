import React, { useContext, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native';
import { Button, Text } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext';
import { Avatar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import { clearAsyncStorage } from '../functions/asyncStorage';
import MyRepoScreen from './MyRepoScreen';
import PreferenceScreen from './PreferenceScreen';

const Stack = createStackNavigator();

const ProfileScreen = ({ navigation }) => {

    const { state, logout } = useContext(AuthContext)
    const { user } = state;


    const handleLogout = () => {
        clearAsyncStorage()
        logout()
    }


    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Home",
        });
    }, [navigation])


    const ProfileComponent = ({ navigation }) => {

        useLayoutEffect(() => {
            navigation.setOptions({
                title: "My Profile",
                headerRight: (() => (
                    <Button
                        type="clear"
                        title="Logout"
                        onPress={handleLogout}
                    />
                ))
            });
        }, [navigation])

        return (
            <SafeAreaView style={styles.profile}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.userInfo}>
                        <Avatar.Image size={200} source={{ uri: user.photoURL.split('=')[0] }} />
                        <View>
                            <Text h2>{user.displayName}</Text>
                            <Text h4>Email: {user.email}</Text>
                            {user.phoneNumber ? <Text h4>Phone Number:  {user.phoneNumber}</Text> : null}
                            <Text h4>Contributions:  {user.contro}</Text>
                            {user.defaultApp ? <Text h4>Default App:  {user.defaultApp}</Text> : null}
                            {user.favApp ? <Text h4>Favourate App:  {user.favApp}</Text> : null}
                            {user.role ? <Text h4>Role:  {user.role}</Text> : null}
                            {user.theme ? <Text h4>Theme:  {user.theme}</Text> : null}
                            <Text style={styles.user__note}>This is all your data on our server.</Text>
                        </View>
                    </View>
                    <View style={styles.buttons}>
                        <Button buttonStyle={styles.button} onPress={() => navigation.navigate('MyRepo')} type="solid" title="My Repos" />
                        <Button buttonStyle={styles.button} onPress={() => navigation.navigate('Preference')} type="outline" title="Preference" />
                    </View>
                </ScrollView>

            </SafeAreaView>
        )
    }

    return (
        <Stack.Navigator >
            <Stack.Screen name="ProfileC" component={ProfileComponent} />
            <Stack.Screen name="MyRepo" component={MyRepoScreen} />
            <Stack.Screen name="Preference" component={PreferenceScreen} />
        </Stack.Navigator>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profile: {
        flex: 1,
    },
    scrollView: {
        width: "100%",
    },
    userInfo: {
        padding: 8,
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 10
    },
    google: {
        fontSize: 10
    },
    user__note: {
        color: 'green',
        textAlign: "center",
        paddingTop: 20,

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        flex: 1,
        width: 150,
    }

})
