import React, { useEffect } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from 'react-native-elements'
import AuthResolve from '../components/AuthResolve'

const SplashScreen = ({ navigation }) => {
    const backgroundImageURL = "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&w=1000&q=80";

    useEffect(() => {
        const unsubscribe = setTimeout(() => navigation.navigate('SignUp'), 2500)
        return () => unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <AuthResolve />
            <ImageBackground
                source={{ uri: backgroundImageURL }}
                style={styles.imgBackground}>
                <LinearGradient
                    colors={["#09203f", "#537895"]}
                    start={[0.1, 0.1]}
                    style={styles.linearGradient}>
                    <Text h1 style={styles.text}>NOTES APP</Text>
                </LinearGradient>
            </ImageBackground>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    linearGradient: {
        width: '100%',
        height: '100%',
        opacity: 0.95,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 250,
    },
    imgBackground: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },
})
