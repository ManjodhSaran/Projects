import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { db } from '../../utils/firebase';
import Error from './Error';
import firebase from 'firebase'

const AddSubject = ({ setOpen, repoId, subjects }) => {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(false);
    // console.log(subjects)

    const nameExists = () => {
        return subjects.some(el => {
            return el.name === name;
        });
    }

    const idExists = () => {
        return subjects.some(el => {
            return el.id === id
        });
    }

    const addSubject = () => {
        setError(null)
        setProgress(true)

        const nameTaken = nameExists()
        const idTaken = idExists()

        if (name && id) {
            if (!nameTaken && !idTaken) {

                const doc = `${name}-${id}`
                const ref = db.collection('repos').doc(repoId).collection('subjects').doc(doc.toLowerCase());

                ref.set({
                    name: name,
                    id: id,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => setOpen(false))

            } else {
                nameTaken && setError("Name already taken.");
                idTaken && setError("ID already taken.");
                (idTaken && nameTaken) && setError("Name and ID already taken.");
            }
        } else {
            setError("Data fields missing");
        }
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Subject Name"
                style={styles.input}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                placeholder="Subject initials(short form)"
                style={styles.input}
                value={id}
                onChangeText={text => setId(text)}
            />
            {error ? <Error message={error} /> : null}
            <Button title='Add' onPress={addSubject} />
        </View>
    )
}

export default AddSubject

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'snow',
        padding: 5,
        borderRadius: 15,
        margin: 5,
        borderColor: 'lightgrey'
    }
})