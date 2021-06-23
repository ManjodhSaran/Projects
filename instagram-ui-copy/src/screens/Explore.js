import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import ExploreCard from '../components/ExploreCard';

const Explore = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.search}>
                    <Ionicons style={styles.icon} name='search' size={20} color='black' />
                    <TextInput placeholderTextColor="grey" style={styles.searchInput} placeholder="Search" />
                </View>
                <View style={styles.images}>
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                    <ExploreCard />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Explore

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: 'white'
    },
    scrollView: {
    },
    search: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

        margin: 10,
        padding: 5,
        backgroundColor: '#E5E9ED',
        borderRadius: 10,
    },
    icon: {
        marginStart: 10
    },
    searchInput: {
        marginStart: 10,
        flex: 1,
        paddingEnd: 5,
    },
    images: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
})
