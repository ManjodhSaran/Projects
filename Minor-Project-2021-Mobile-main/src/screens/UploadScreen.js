import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native'

import { Text, Button } from 'react-native-elements';
import { appData, db, storage } from '../../utils/firebase';
import { TextInput } from 'react-native-paper';

import { Context as AuthContext } from '../context/AuthContext';
import { Dimensions } from 'react-native';
import { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as Random from 'expo-random';

import firebase from 'firebase'
import Error from '../components/Error';

const UploadScreen = ({ navigation, route }) => {


    const { state } = useContext(AuthContext)
    const { user } = state

    const { repoId } = route.params

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('')
    const [subjectID, setSubjectID] = useState('');
    const [type, setType] = useState('specificTopic');
    const [subjects, setSubjects] = useState([]);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540manjodhsaran%252FnotesApp/Graphics%20Primitives.pdf');
    const [pageCount, setPageCount] = useState(null);
    const [checked, setChecked] = useState(false);
    const [uploading, setUploading] = useState(false);
    console.log(file)
    useLayoutEffect(() =>
        navigation.setOptions({
            title: "Upload Notes"
        })
        , [navigation])
    console.log(file)
    useEffect(() => {
        if (repoId) {
            const ref = db.collection("repos").doc(repoId).collection("subjects").get().then(snapshot => setSubjects(snapshot.docs.map(doc => doc.data())))
        } else {
            () => navigation.navigate('Home')
        }

    }, [repoId])

    const getuuid = () => {
        return `${Random.getRandomBytes(1)[0]}-${Random.getRandomBytes(1)[0]}-${Random.getRandomBytes(1)[0]}-${Random.getRandomBytes(1)[0]}-${Random.getRandomBytes(1)[0]}-${Random.getRandomBytes(1)[0]}`
    }

    const uploadPost = () => {
        setUploading(true)
        setProgress(10);
        setError("")

        const docID = getuuid();


        if (file && title.length !== 0 && subjectID.length !== 0) {

            const uploadTask = storage.ref(`repos/${repoId}/${subjectID}/${file.name}`).put(file.output[0]);

            uploadTask.on("state_changed", snapshot => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress)
            }, (error) => {
                console.log(error);
                alert(error.message)
            }, () => {
                storage
                    .ref(`repos/${repoId}/${subjectID}/${file.name}`)
                    .getDownloadURL()
                    .then(url => {


                        const ref = db.collection("repos").doc(repoId)

                        ref.collection(subjectID).doc(docID).set({
                            title: title,
                            subject: subjectID,
                            type: type,
                            file: file.name,
                            fileURL: url,
                            fileInfo: {
                                name: file.name,
                                size: file.size,
                                type: file.type,
                                lastModified: file.lastModified,
                                lastModifiedDate: file.lastModifiedDate,
                                webkitRelativePath: file.webkitRelativePath,
                            },
                            pageCount: pageCount,
                            description: description,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            uploadedBy: user.displayName,
                            userID: user.uid,
                            anonymous: checked,
                            approved: false
                        })
                    }).catch(function (error) {
                        switch (error.code) {
                            case 'storage/object-not-found':
                                alert(error.code)
                                break;

                            case 'storage/unauthorized':
                                alert(error.code)
                                break;

                            case 'storage/canceled':
                                alert(error.code)
                                break;

                            case 'storage/unknown':
                                alert(error.code)
                                break;
                        }
                    })


                appData.collection("recents")
                    .add({
                        repoIdName: repoId,
                        message: `<strong>${user.displayName}</strong> uploaded <strong>${title}</strong> on <strong>${subjectID}</strong> with docID: <strong>${docID}</strong>`,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })

                db.collection("Users").doc(user.uid).set(
                    { contro: parseFloat(user.contro) + parseFloat(1) },
                    { merge: true }
                ).then(() => navigation.navigate("RepoC", { subjectID }))

                setProgress(0);
                setTitle("");
                setDescription("");
                setFile(null);
                setSubjectID("");
            })
        } else {
            setError("Field Value Missing!!")
            !file && setError("Select File to upload")
            !subjectID && setError("Select subject")
            !title && setError("Set Title")
            setUploading(false)
        }
    }

    const selectFile = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "*/*"
        });
        setFile(result);
    }

    return (
        <View style={styles.upload}>
            <View style={styles.uploadContainer}>
                <Text h3>Enter Details</Text>
                {error ? <Error message={error} /> : null}
                <TextInput
                    placeholder="Title/Topic"
                    value={title}
                    style={styles.input}
                    onChangeText={text => setTitle(text)}
                    autoCorrect={false}
                />
                <Picker
                    style={styles.input}
                    selectedValue={subjectID}
                    onValueChange={(itemValue, itemIndex) => setSubjectID(itemValue)}>
                    <Picker.Item key={`menu__item__}`} value={null} label={"Select Subject"} />
                    {subjects.map(subject =>
                        <Picker.Item key={`menu__item__${subject.id}`} value={subject.id} label={subject.name} />
                    )}
                </Picker>
                <Picker
                    selectedValue={type}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
                    <Picker.Item key={`menu__item2__${1}`} value="book" label={"Book"} />
                    <Picker.Item key={`menu__item2__${2}`} value="handWritten" label={"Hand Written"} />
                    <Picker.Item key={`menu__item2__${3}`} value="specificTopic" label={"Specific Topic"} />
                </Picker>
                <Button
                    title={!file ? "Select File" : "Change File"}
                    onPress={selectFile}
                    type="outline"
                />
                {file ? <Text h5>File: {file.name}</Text> : null}
                <TextInput
                    placeholder="Description"
                    value={description}
                    style={styles.input}
                    onChangeText={text => setDescription(text)}
                    autoCorrect={false}
                />
                <Button
                    title="Upload Anonymously"
                    type="clear"
                    icon={checked ?
                        <MaterialCommunityIcons name="checkbox-intermediate" size={24} color="black" />
                        :
                        <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />
                    }
                    onPress={() => setChecked(!checked)}
                />
                <Button
                    title="Upload"
                    onPress={uploadPost}
                    type="solid"
                    style={styles.button}
                    disabled={uploading && true}
                />
            </View>
        </View>
    )
}

export default UploadScreen

const styles = StyleSheet.create({
    upload: {
        flex: 1,
    },
    uploadContainer: {
        elevation: 5,
        backgroundColor: '#fff',
        padding: 5
    },
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    },
    button: {
        borderRadius: 50
    },
})
