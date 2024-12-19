import React, {ReactNode} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/colors';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  value: string;
  placeHolder?: string;
  title?: string;
  prefix?: ReactNode;
  affix?: ReactNode;
  allowClear?: boolean;
  multiline?: boolean;
  numberOfLine?: number;
  onChange: (val: string) => void;
}

export default function InputComponent(props: Props) {
  const {
    value,
    placeHolder,
    title,
    prefix,
    affix,
    allowClear,
    multiline,
    numberOfLine,
    onChange,
  } = props;

  return (
    <View style={{marginBottom: 16}}>
      {title && <TextComponent text={title} />}
      <RowComponent
        style={[
          globalStyles.inputContainer,
          {
            marginTop: title ? 8 : 0,
            minHeight: multiline && numberOfLine ? 32 * numberOfLine : 32,
            paddingVertical: 14,
            paddingHorizontal: 10,
            alignItems: multiline && numberOfLine ? 'flex-start' : 'center',
          },
        ]}>
        {prefix && prefix}
        <View
          style={{
            flex: 1,
            paddingLeft: prefix ? 8 : 0,
            paddingRight: affix ? 8 : 0,
          }}>
          <TextInput
            multiline={multiline}
            numberOfLines={numberOfLine}
            style={[
              globalStyles.text,
              {
                margin: 0,
                padding: 0,
                paddingVertical: 6,
                flex: 1,
                textAlignVertical: multiline && numberOfLine ? 'top' : 'center',
              },
            ]}
            placeholder={placeHolder ?? ''}
            placeholderTextColor={'#676767'}
            value={value}
            onChangeText={val => onChange(val)}
          />
        </View>
        {affix && affix}
        {allowClear && value && (
          <TouchableOpacity onPress={() => onChange('')}>
            <AntDesign name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        )}
      </RowComponent>
    </View>
  );
}
