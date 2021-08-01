import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-elements'

const NewRepoScreen = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Home",
            title: "Create New Repo",
        });
    }, [navigation])
    return (
        <View>
            <Text>NEW REPO</Text>
        </View>
    )
}

export default NewRepoScreen