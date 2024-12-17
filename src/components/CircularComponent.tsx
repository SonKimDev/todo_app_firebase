import React from 'react';
import {Platform} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  color?: string;
  value: number;
  maxValue?: number;
  radius?: number;
  fontSize?: number;
}

export default function CircularComponent(props: Props) {
  const {color, value, maxValue, radius, fontSize} = props;

  return (
    <CircularProgress
      value={value}
      title={`${value}%`}
      radius={radius ?? 46}
      showProgressValue={false}
      activeStrokeColor={color ?? colors.blue}
      inActiveStrokeColor={'#3C444A'}
      titleColor={colors.text}
      titleFontSize={fontSize ?? 24}
      titleStyle={{
        fontFamily: fontFamilies.semiBold,
      }}
    />
  );
}
