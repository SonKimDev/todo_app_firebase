import {StyleProp, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
}

export default function SectionComponent(props: Props) {
  const {children, styles} = props;

  return <View style={[globalStyles.section, styles]}>{children}</View>;
}
