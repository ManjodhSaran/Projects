import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import WebView from 'react-native-webview';

const NotesCard = ({ title, description, username, file, pageCount, fileURL, timestamp, subjectName, anonymous, id, subjectID, userID, starredList, navigation }) => {

    const [uri, setURI] = useState(null)

    return (
        <View style={styles.container}>
            <Text h4>{title}</Text>
            {description ? <Text h5>{description}</Text> : null}
            <Text h6>uploaded by: {username}</Text>
            <Button
                icon={
                    <Ionicons style={styles.downloadIcon} name="cloud-download-sharp" size={24} color="white" />
                }
                type="solid"
                title="Download"
                onPress={() => setURI(fileURL)}
            />
            {uri ?
                <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    originWhitelist={['*']}
                    source={{ uri: uri }}
                    style={{ marginTop: 20 }}
                />
                : null
            }
        </View>
    )
}

export default NotesCard

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "lightblue",
    },
    downloadIcon: {
        marginRight: 20,
    }
})
