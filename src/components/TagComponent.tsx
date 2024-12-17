import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';

interface Props {
  text: string;
  color?: string;
  tagStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export default function TagComponent(props: Props) {

  const { text, color, tagStyle, textStyle, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={[globalStyles.tag, tagStyle, {backgroundColor: color ?? colors.blue}]}>
      <TextComponent text={text} styles={textStyle} />
    </TouchableOpacity>
  );
}
