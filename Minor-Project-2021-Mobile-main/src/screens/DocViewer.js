import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, Dimensions, View } from 'react-native'
import * as FileSystem from 'expo-file-system';
import PdfReader from 'rn-pdf-reader-js';
import { downloadToFolder } from 'expo-file-dl';
import { Button } from 'react-native-elements/dist/buttons/Button';
import WebView from 'react-native-webview';
// import pdf2base64 from "pdf-to-base64"
// import PDFView from 'react-native-view-pdf';
// import base64 from 'base64-js'

// import * as Permissions from 'expo-permissions';
// import * as MediaLibrary from 'expo-media-library';
// import * as IntentLauncher from 'expo-intent-launcher';
// import { WebView } from 'react-native-webview'

const DocViewer = ({ navigation, route }) => {
    const [openPdf, setOpenPdf] = useState(false)
    const [uri, setURI] = useState(null)
    const { fileURL, title, file } = route.params
    console.log(fileURL)

    useLayoutEffect(() => navigation.setOptions({ title: title ?? "GO BACK" }), [navigation]);
    useEffect(() => fileURL && downloadFile(), [fileURL]);

    const downloadFile = () => {
        const fileUri = FileSystem.documentDirectory + file;
        FileSystem.downloadAsync(fileURL, fileUri)
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
                setURI(uri);
            })
            .catch(error => {
                console.error(error);
            });
        console.log('yes')
    }

    var url = 'https://firebasestorage.googleapis.com/v0/b/gne-notes.appspot.com/o/repos%2F101282744790893230453-Sem6%2FCD%2FGraphics%20Primitives.pdf?alt=media&token=d21b8c6e-53c7-4386-827a-7e5675050b11';



    return (
        <View style={styles.container}>
            {uri ? <Text>{uri}</Text> : null}
            {/* 
                <PdfReader
                    source={{
                        uri: uri,
                    }}
                />  */}
            <WebView
                bounces={false}
                scrollEnabled={false}
                source={{ uri: 'https://www.youtube.com/' }} />

        </View>
    )
}
// file:///data/user/0/host.exp.exponent/files/ExperienceData/%2540manjodhsaran%252FnotesApp/Graphics%20Primitives.pdf
export default DocViewer

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})
