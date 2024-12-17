import React from 'react';
import TextComponent from './TextComponent';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
}

export default function TitleComponent(props: Props) {

  const { text, size, font, color } = props;

  return <TextComponent text={text} size={size ?? 20} font={font ?? fontFamilies.semiBold} color={color}/>;
}
