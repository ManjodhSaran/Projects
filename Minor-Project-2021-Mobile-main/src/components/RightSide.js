import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { db } from '../../utils/firebase';
import CircularProgress from './CircularProgress';
import NotesCard from './NotesCard';

const RightSide = ({ repoId, name, activeSubject, navigation }) => {

    const [subjectID, setSubjectID] = useState(null);
    const [notes, setNotes] = useState([])

    useEffect(() => {
        activeSubject && setSubjectID(activeSubject.id)
    }, [repoId, activeSubject]);

    useEffect(() => {
        if (repoId && subjectID) {
            const ref = db.collection("repos").doc(repoId)
            ref.collection(subjectID)
                .orderBy("timestamp", "desc")
                .onSnapshot(snapshot =>
                    setNotes(snapshot.docs.map(doc => ({ id: doc.id, note: doc.data() })))
                )
        }
    }, [subjectID, repoId]);

    return (
        <View style={styles.container}>
            {notes ? (notes.length !== 0 ?
                notes.map(({ id, note }) =>
                    <NotesCard
                        key={id}
                        id={id}
                        subjectID={subjectID}
                        title={note.title}
                        description={note.description}
                        file={note.file}
                        fileURL={note.fileURL}
                        pageCount={note.pageCount}
                        username={note.uploadedBy}
                        timestamp={note.timestamp}
                        subjectName={note.subject}
                        anonymous={note.anonymous}
                        userID={note.userID}
                        navigation={navigation}
                    //  starredList={starred}
                    />

                )
                :
                (activeSubject ?
                    <View style={styles.noNotes}>
                        <Text h3>No Notes Available</Text>
                    </View>
                    :
                    <View style={styles.noNotes}>
                        <Text h3>{name?.toUpperCase()}</Text>
                    </View>
                )
            )
                :
                <CircularProgress />
            }
        </View>
    )
}

export default RightSide

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loading: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noNotes: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    }
})
