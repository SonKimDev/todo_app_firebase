import { ScrollView } from 'react-native';
import React, { ReactNode } from 'react';
import { globalStyles } from '../styles/globalStyles';

interface Props {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  children: ReactNode;
}

export default function Container(props: Props) {

  const {title, back, right, children} = props;

  return (
    <ScrollView style={[globalStyles.container]}>
      {children}
    </ScrollView>
  );
}
