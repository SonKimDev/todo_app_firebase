import React from 'react';
import {Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Container from '../components/Container';
import SpaceComponent from '../components/SpaceComponent';
import TextComponent from '../components/TextComponent';
import {globalStyles} from '../styles/globalStyles';

export default function SearchScreen() {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[globalStyles.container]}>
      <SpaceComponent height={Platform.OS === 'ios' ? top : top + 10} />
      <Container back>
        <TextComponent text="Search Screen" />
      </Container>
    </View>
  );
}
