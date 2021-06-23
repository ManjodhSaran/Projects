import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainFlow from './src/screens/MainFlow';
import LoginFlow from './src/screens/LoginFlow';

export default function App() {
  const user = true;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {!user ?
          <LoginFlow />
          :
          <MainFlow />
        }
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
