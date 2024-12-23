import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import TextComponent from './TextComponent';

interface Props {
  text: string;
  isLoading?: boolean;
  color?: string;
  onPress: () => void;
}

export default function ButtonComponent(props: Props) {
  const {text, isLoading, color, onPress} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color ? color : isLoading ? colors.gray : colors.blue,
        padding: 14,
        borderRadius: 12,
      }}>
      {isLoading ? (
        <ActivityIndicator color={colors.text} />
      ) : (
        <TextComponent
          text={text}
          flex={0}
          styles={{textTransform: 'uppercase'}}
          size={16}
          font={fontFamilies.semiBold}
        />
      )}
    </TouchableOpacity>
  );
}
