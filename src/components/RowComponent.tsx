import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { globalStyles } from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  justifyContent?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function RowComponent(props: Props) {

  const { children, justifyContent, style, onPress } = props;

  const localStyle = [globalStyles.row, {justifyContent: justifyContent ?? 'center'}, style];

  return onPress ? (
    <TouchableOpacity style={localStyle} onPress={onPress ? () => onPress() : undefined}>{children}</TouchableOpacity>
  ) : (
    <View style={localStyle}>
      {children}
    </View>
  );
}
