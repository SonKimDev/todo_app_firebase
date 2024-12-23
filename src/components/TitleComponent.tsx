import React from 'react';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  styles?: StyleProp<TextStyle>;
}

export default function TitleComponent(props: Props) {
  const {text, size, font, color, styles} = props;

  return (
    <TextComponent
      text={text}
      size={size ?? 20}
      font={font ?? fontFamilies.semiBold}
      color={color}
      styles={styles}
    />
  );
}
