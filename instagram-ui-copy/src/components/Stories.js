import React from 'react'
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import StoryCard from './StoryCard'

const Stories = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
        >
            <View style={styles.container}>
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
                <StoryCard />
            </View>
        </ScrollView>
    )
}

export default Stories

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 100,
        minWidth: Dimensions.get('window').width,
        borderBottomColor: 'whitesmoke',
        borderBottomWidth: 1,
        paddingStart: 10,
    }
})
