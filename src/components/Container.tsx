import {useNavigation} from '@react-navigation/native';
import {ArrowLeft2} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  children: ReactNode;
}

const ios = Platform.OS === 'ios';

export default function Container(props: Props) {
  const {title, back, right, children} = props;
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <View style={[globalStyles.container, {paddingTop: ios ? top : top + 10}]}>
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
      <ScrollView>{children}</ScrollView>
    </View>
  );
}
