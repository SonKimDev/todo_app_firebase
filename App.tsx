import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Router from './src/routers/Router';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={'transparent'}
      />
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </SafeAreaView>
  );
}
