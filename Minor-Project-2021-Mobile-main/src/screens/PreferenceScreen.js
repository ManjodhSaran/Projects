import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Switch, View } from 'react-native'
import { Text } from 'react-native-elements'

const PreferenceScreen = ({ navigation }) => {

    const [isEnabled, setIsEnabled] = useState(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Preference",
        });
    }, [navigation])

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <View style={styles.option}>
                <Text style={styles.optionTitle}>{isEnabled ? 'Dark Mode' : 'Light Mode'}</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#2D333B' }}
                    thumbColor={isEnabled ? '#4A5461' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
        </View>
    )
}

export default PreferenceScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: '400'
    }
})
