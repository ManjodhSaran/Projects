import React from 'react'
import { StyleSheet, Text } from 'react-native'

const Error = ({ message }) => {
    return <Text style={styles.text}>{message}</Text>
}

export default Error

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: 'red'
    }
})
