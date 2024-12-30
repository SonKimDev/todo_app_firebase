import { useNavigation } from '@react-navigation/native';
import { ArrowLeft2 } from 'iconsax-react-native';
import React, { ReactNode } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  children: ReactNode;
  isScroll?: boolean;
}


export default function Container(props: Props) {
  const {title, back, right, children, isScroll} = props;
  const navigation = useNavigation();
  return (
    <View style={[globalStyles.container]}>
      <RowComponent
        style={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {back && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{zIndex: 10}}>
            <ArrowLeft2 size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <View style={{flex: 1}}>
          {title && (
            <TextComponent
              font={fontFamilies.bold}
              size={16}
              text={title}
              color={colors.text}
              styles={{textAlign: 'center', marginLeft: back ? -24 : 0}}
            />
          )}
        </View>
      </RowComponent>
      {isScroll ? (
        <ScrollView>{children}</ScrollView>
      ) : (
        <View style={{flex: 1}}>{children}</View>
      )}
    </View>
  );
}
