import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

const LinearGradient1 = (props) => {
    return (
        <LinearGradient
            colors={['#4c669f', '#192f6a']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            {props.childern}
        </LinearGradient>
    )
}

export default LinearGradient1

const styles = StyleSheet.create({})
