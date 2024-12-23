import React, {ReactNode, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/colors';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import TitleComponent from './TitleComponent';
import {Eye, EyeSlash} from 'iconsax-react-native';

interface Props {
  value: string;
  placeHolder?: string;
  title?: string;
  prefix?: ReactNode;
  affix?: ReactNode;
  allowClear?: boolean;
  multiline?: boolean;
  numberOfLine?: number;
  isPassword?: boolean;
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
    isPassword,
    onChange,
  } = props;

  const [showPass, setShowPass] = useState(false);

  return (
    <View style={{marginBottom: 16}}>
      {title && <TextComponent text={title} />}
      <RowComponent
        style={[
          globalStyles.inputContainer,
          {
            marginTop: title ? 8 : 0,
            minHeight: multiline && numberOfLine ? 60 * numberOfLine : 60,
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
            secureTextEntry={isPassword ? !showPass : false}
            multiline={multiline}
            numberOfLines={numberOfLine}
            style={[
              globalStyles.text,
              {
                flex: 1,
                padding: 0,
                margin: 0,
                textAlignVertical: multiline && numberOfLine ? 'top' : 'center',
              },
            ]}
            placeholder={placeHolder ?? ''}
            placeholderTextColor={'#676767'}
            value={value}
            onChangeText={val => onChange(val)}
            autoCapitalize="none"
          />
        </View>
        {affix && affix}
        {allowClear && value && (
          <TouchableOpacity onPress={() => onChange('')}>
            <AntDesign name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        )}

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            {showPass ? (
              <EyeSlash size={20} color={colors.desc} />
            ) : (
              <Eye size={20} color={colors.desc} />
            )}
          </TouchableOpacity>
        )}
      </RowComponent>
    </View>
  );
}
