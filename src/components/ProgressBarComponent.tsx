import React from 'react';
import {DimensionValue, View} from 'react-native';
import {colors} from '../constants/colors';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
  size?: 'small' | 'default' | 'large';
  color?: string;
  percent: DimensionValue;
}

export default function ProgressBarComponent(props: Props) {
  const {size, color, percent} = props;

  const heightContent = size === 'small' ? 6 : size === 'large' ? 10 : 8;

  return (
    <View style={{marginTop: 12, marginBottom: 16}}>
      <View
        style={{
          height: heightContent,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)',
          borderRadius: 999,
        }}>
        <View
          style={{
            backgroundColor: color ?? colors.blue,
            width: percent,
            height: heightContent,
            borderRadius: 999,
          }}
        />
      </View>
      <SpaceComponent height={4} />
      <RowComponent justifyContent="space-between">
        <TextComponent text="Progress" size={12} />
        <TextComponent text={`${percent}`} size={12} font={fontFamilies.bold}/>
      </RowComponent>
    </View>
  );
}
