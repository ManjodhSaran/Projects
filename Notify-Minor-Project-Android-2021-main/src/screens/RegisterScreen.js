import React, { useState } from 'react'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import StudentRegister from '../components/StudentRegister';
import TeacherRegister from '../components/TeacherRegister';
import { BackgroundImage } from 'react-native-elements/dist/config';

const RegisterScreen = ({ navigation }) => {

    const [tab, setTab] = useState(1)

    return (
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(142,144,179,1)', 'transparent']}
                style={styles.container}
            >
            <View style={styles.inputs}>
                <View style={styles.tab}>
                    <Button type="clear" title="Student" onPress={() => setTab(1)} />
                    <Button type="clear" title="Teacher" onPress={() => setTab(2)} />
                </View>
                {tab === 1 ? <StudentRegister /> : <TeacherRegister />}
            </View>
            </LinearGradient>
      
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputs: {
        width: '92%',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 15,
        height: 500,
        opacity: .9,
    },

    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-evenly',
        padding:60,
        width:'90%'
    },
    splash: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})
