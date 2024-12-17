import React, {ReactNode} from 'react';
import {ImageBackground, View} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  color?: string;
}

export default function CardImageContainer(props: Props) {
  const {children, color} = props;

  return (
    <ImageBackground
      source={require('../assets/images/card-bg.png')}
      imageStyle={{borderRadius: 12}}
      style={[globalStyles.card]}>
      <View
        style={[
          {
            borderRadius: 12,
            backgroundColor: color ?? 'rgba(133, 77, 217, 0.9)',
            flex: 1,
            padding: 12,
          },
        ]}>
        {children}
      </View>
    </ImageBackground>
  );
}
