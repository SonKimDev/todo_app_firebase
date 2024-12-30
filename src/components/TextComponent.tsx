import {StyleProp, Text, TextStyle} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';
import {colors} from '../constants/colors';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  flex?: number;
  height?: number;
  line?: number;
  styles?: StyleProp<TextStyle>;
}

export default function TextComponent(props: Props) {
  const {text, size, font, color, flex, height, line, styles} = props;

  return (
    <Text
      numberOfLines={line}
      style={[
        globalStyles.text,
        {
          flex: flex && 1,
          fontFamily: font ?? fontFamilies.regular,
          lineHeight: height ? height : 20,
          fontSize: size ?? 14,
          color: color ?? colors.desc,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
}
