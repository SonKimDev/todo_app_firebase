import React, {ReactNode} from 'react';
import {ImageBackground, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  color?: string;
  onPress?: () => void;
}

export default function CardImageContainer(props: Props) {
  const {children, color, onPress} = props;

  const renderCard = (
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

  return onPress ? (
    <TouchableOpacity onPress={onPress}>{renderCard}</TouchableOpacity>
  ) : (
    renderCard
  );
}
