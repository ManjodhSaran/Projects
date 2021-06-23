import React from 'react'
import { Dimensions, Image, StyleSheet } from 'react-native'

const ExploreCard = () => {
    return (
        <Image
            style={styles.image}
            source={{ uri: 'https://reactjs.org/logo-og.png' }}
        />
    )
}

export default ExploreCard

const styles = StyleSheet.create({
    image: {
        minWidth: ((Dimensions.get('window').width - 4) / 3),
        height: 120,
        marginBottom: 2
    }
})
