import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { db } from '../../utils/firebase';
import CircularProgress from './CircularProgress';

import { LinearGradient } from 'expo-linear-gradient';
import AddSubject from './AddSubject';

const Subjects = ({ repoId, name, activeSubject, setActiveSubject, user }) => {

    const [subjects, setSubjects] = useState([]);
    const [open, setOpen] = useState(false);
    const [repoOwner, setRepoOwner] = useState(null);

    useEffect(() => {
        if (repoId) {
            const ref = db.collection("repos").doc(repoId).collection("subjects");

            ref.orderBy('timestamp', 'asc').onSnapshot(snapshot =>
                setSubjects(snapshot.docs.map(doc => doc.data()))
            )
        }
    }, [repoId])

    useEffect(() => {
        (user && repoId) && db.collection('repos').doc(repoId).get().then(doc => doc.data() && (doc.data().createdBy && setRepoOwner(doc.data().createdBy)))
    }, [user, repoId])

    return (
        <View>
            {subjects ?
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    style={styles.subjects}
                >
                    {subjects.map(({ name, id }) =>
                        <LinearGradient
                            colors={['#4c669f', '#192f6a']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.subjects__option}
                            key={name, id}
                        >
                            <TouchableOpacity onPress={() => setActiveSubject({ name, id, repoId })}>
                                <Text h4 style={styles.subjectName}>{name}</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    )}
                    {user.uid === repoOwner ? <LinearGradient
                        colors={['#4c669f', '#192f6a']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.subjects__option}
                    >
                        <TouchableOpacity onPress={() => setOpen(!open)}>
                            <Text h4 style={styles.subjectName}>+</Text>
                        </TouchableOpacity>
                    </LinearGradient> : null}
                </ScrollView>
                :
                <CircularProgress />
            }
            {open ? <AddSubject repoId={repoId} subjects={subjects} setOpen={setOpen} /> : null}
        </View>
    )
}

export default Subjects

const styles = StyleSheet.create({
    subjects: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        borderColor: '#000',
        paddingBottom: 5,
        paddingTop: 5
    },
    subjects__option: {
        padding: 10,
        backgroundColor: '#000',
        marginRight: 8,
        borderRadius: 50,
        marginLeft: 2
    },
    subjectName: {
        color: '#fff'
    }
})
