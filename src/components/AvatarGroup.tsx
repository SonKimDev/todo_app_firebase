import React from 'react';
import {Image, View} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  uids?: string[];
}

export default function AvatarGroup(props: Props) {
  const {uids} = props;

  const uidLength = 4;
  const images = 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png';
  const imageStyle = {
    width: 32,
    height: 32,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.white,
  };
  return (
    <RowComponent justifyContent="flex-start">
      {Array.from({length: 10}).map(
        (item, index) =>
          index < 3 && (
            <Image
              key={index}
              source={{uri: images}}
              style={[
                globalStyles.shadow,
                imageStyle,
                {
                  marginLeft: index > 0 ? -15 : 0,
                },
              ]}
            />
          ),
      )}
      {uidLength > 3 && (
        <View
          style={[
            imageStyle,
            {
              backgroundColor: 'coral',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: -20,
              borderWidth: 1,
            },
          ]}>
          <TextComponent
            flex={0}
            font={fontFamilies.medium}
            styles={{lineHeight: 20}}
            text={`+${uidLength - 3 > 9 ? 9 : uidLength - 3}`}
          />
        </View>
      )}
    </RowComponent>
  );
}
