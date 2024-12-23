import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

export default function LoadingScreen() {
  return (
    <View
      style={[
        globalStyles.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <ActivityIndicator size={'large'} color={'coral'} />
    </View>
  );
}
