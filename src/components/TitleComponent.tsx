import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {fontFamilies} from '../constants/fontFamilies';
import TextComponent from './TextComponent';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  styles?: StyleProp<TextStyle>;
  flex?: number;
}

export default function TitleComponent(props: Props) {
  const {text, size, font, color, styles, flex} = props;

  return (
    <TextComponent
      text={text}
      size={size ?? 16}
      font={font ?? fontFamilies.bold}
      color={color}
      styles={styles}
      flex={flex}
    />
  );
}
