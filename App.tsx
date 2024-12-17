import { StatusBar } from 'react-native';
import React from 'react';
import HomeScreen from './src/homes/HomeScreen';

export default function App() {
  return (
    <>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={'transparent'}/>
      <HomeScreen/>
    </>
  );
}
