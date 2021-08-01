import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'
import { Text } from "react-native-elements"
import { db } from '../../utils/firebase';
import CircularProgress from './CircularProgress';

const Sidebar = ({ app, setActiveSubject, showSidebar, setShowSidebar }) => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        if (app) {
            const ref = db.collection("apps").doc(app).collection("subjects")
            ref.orderBy('timestamp', 'asc').onSnapshot(snapshot =>
                setSubjects(snapshot.docs.map(doc => doc.data()))
            )
        }
    }, [app])

    useEffect(() => {
        if (subjects.length !== 0) {
            const subject = subjects[0]
            setActiveSubject(subject)
        }
    }, [subjects])

    return (
        <>
            <View style={showSidebar ? styles.sidebar__open : styles.sidebar}>
                {subjects ? subjects.map(({ name, id }) =>
                    <TouchableOpacity
                        key={name}
                        style={styles.sidebar__option}
                        onPress={() => { setActiveSubject({ name, id }); setShowSidebar(false) }}
                    >
                        <Text h4>{name}</Text>
                    </TouchableOpacity>
                ) :
                    <CircularProgress />
                }
            </View>
        </>
    )
}

export default Sidebar

const styles = StyleSheet.create({
    sidebar: {
        width: 0,
        display: "none",
        position: "absolute",
        left: 0
    },
    sidebar__iconLeft: {
        right: -220
    },
    sidebar__iconRight: {
        right: 0,
    },
    sidebar__open: {
        flex: 1,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: 'lightblue',
        width: Dimensions.get('window').width,
    },
    sidebar__option: {
        padding: 20,
        borderBottomColor: "black",
        borderBottomWidth: 1
    },
    container: {
        flex: 1,
        marginTop: 56,
    },
    loading: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    }
})

            // <TouchableOpacity
            //     onPress={() => setShowSidebar(!showSidebar)}
            //     style={styles.sidebar__icon}
            // >
            //     <AntDesign style={showSidebar ? styles.sidebar__iconLeft : styles.sidebar__iconRight} name={!showSidebar ? "doubleright" : "doubleleft"} size={24} color="black" />
            // </TouchableOpacity>