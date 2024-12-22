import {ArrowDown2} from 'iconsax-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {colors} from '../constants/colors';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import TitleComponent from './TitleComponent';

interface Props {
  type?: 'date' | 'time' | 'datetime';
  title?: string;
  placeHolder?: string;
  selected?: Date;
  onSelect: (val: Date) => void;
}

export default function DateTimePickerComponent(props: Props) {
  const {type, title, placeHolder, selected, onSelect} = props;

  const [isVisibleModalDateTime, setIsVisibleModalDateTime] = useState(false);

  const hideDatePicker = () => {
    setIsVisibleModalDateTime(false);
  };

  const handleConfirm = (date: Date) => {
    onSelect(date);
    hideDatePicker();
  };

  return (
    <>
      <View style={{marginBottom: 16}}>
        {title && <TitleComponent text={title} />}
        <RowComponent
          onPress={() => setIsVisibleModalDateTime(true)}
          style={[
            globalStyles.inputContainer,
            {marginTop: title ? 8 : 0, paddingVertical: 16},
          ]}>
          <TextComponent
            flex={1}
            text={
              selected
                ? type === 'time'
                  ? `${String(selected.getHours()).padStart(2, '0')}:${String(
                      selected.getMinutes(),
                    ).padStart(2, '0')}`
                  : `${String(selected.getDate()).padStart(2, '0')}/${String(
                      selected.getMonth() + 1,
                    ).padStart(2, '0')}/${selected.getFullYear()}`
                : placeHolder ?? ''
            }
            color={selected ? colors.text : '#676767'}
          />
          <ArrowDown2 size={20} color={colors.text} />
        </RowComponent>
      </View>

      <DateTimePickerModal
        isVisible={isVisibleModalDateTime}
        mode={type ?? 'datetime'}
        onConfirm={handleConfirm}
        onCancel={() => setIsVisibleModalDateTime(false)}
        locale="en_GB"
        date={selected ?? new Date()}
      />
    </>
  );
}
