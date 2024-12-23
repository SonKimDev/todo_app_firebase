import {ArrowDown2, SearchNormal1, TickCircle} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {FlatList, Modal, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '../constants/colors';
import {SelectModel} from '../models/SelectModel';
import {globalStyles} from '../styles/globalStyles';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import TitleComponent from './TitleComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  title?: string;
  items: SelectModel[];
  selected?: string[];
  multiple?: boolean;
  onSelect: (val: string[]) => void;
}

export default function DropDownPickerComponent(props: Props) {
  const {title, items, selected, multiple, onSelect} = props;

  const [isVisible, setIsVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [result, setResult] = useState<SelectModel[]>([]);
  const [dataSelected, setDataSelected] = useState<string[]>([]);

  const {top} = useSafeAreaInsets();

  function handleSelectItem(id: string) {
    if (multiple) {
      const data = [...dataSelected];

      const index = dataSelected.findIndex(element => element === id);

      if (index !== -1) {
        data.splice(index, 1);
      } else {
        data.push(id);
      }

      setDataSelected(data);
    } else {
      const index = dataSelected.findIndex(element => element === id);

      if (index !== -1) {
        setDataSelected([]);
      } else {
        setDataSelected([id]);
      }
    }
  }

  function handleConfirmSelect() {
    onSelect(dataSelected);

    setIsVisible(false);

    setDataSelected([]);
  }

  function handleRemoveItemSelected(index: number) {
    if (selected) {
      selected.splice(index, 1);
      onSelect(selected);
    }
  }

  function renderSelectedItem(id: string, index: number) {
    const item = items.find(element => element.value === id);

    return (
      item && (
        <RowComponent
          onPress={() => handleRemoveItemSelected(index)}
          key={id}
          style={{
            marginRight: 4,
            marginBottom: 8,
            padding: 4,
            borderRadius: 999,
            borderCurve: 'continuous',
            borderWidth: 1,
            borderColor: 'coral',
          }}>
          <TextComponent text={item.label} color="coral" />
          <SpaceComponent width={4} />
          <AntDesign size={14} name="close" color={'coral'} />
        </RowComponent>
      )
    );
  }

  useEffect(() => {
    selected && setDataSelected(selected);
  }, [isVisible, selected]);

  useEffect(() => {
    if (!searchText) {
      setResult([]);
    } else {
      const data = items.filter(element =>
        element.label.toLowerCase().includes(searchText.toLowerCase()),
      );

      setResult(data);
    }
  }, [searchText]);

  return (
    <View style={{marginBottom: 16}}>
      {title && <TitleComponent text={title} />}
      <RowComponent
        onPress={() => setIsVisible(true)}
        style={[
          globalStyles.inputContainer,
          {marginTop: title ? 8 : 0, paddingVertical: 16},
        ]}>
        <View style={{flex: 1, paddingRight: 12}}>
          {selected && selected?.length > 0 ? (
            <RowComponent
              justifyContent="flex-start"
              style={{flexWrap: 'wrap'}}>
              {selected.map((id, index) => renderSelectedItem(id, index))}
            </RowComponent>
          ) : (
            <TextComponent text="Select" color={colors.gray2} />
          )}
        </View>
        <ArrowDown2 size={20} color={colors.text} />
      </RowComponent>

      <Modal
        visible={isVisible}
        transparent
        animationType="slide"
        statusBarTranslucent>
        <View style={[globalStyles.container, {padding: 20, paddingTop: top}]}>
          <FlatList
            data={searchText ? result : items}
            ListHeaderComponent={
              <RowComponent>
                <View style={{flex: 1}}>
                  <InputComponent
                    value={searchText}
                    onChange={setSearchText}
                    placeHolder="Search"
                    prefix={<SearchNormal1 size={22} color={colors.gray2} />}
                    allowClear
                  />
                </View>
                <SpaceComponent width={12} />
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <TextComponent text="Cancel" color="coral" />
                </TouchableOpacity>
              </RowComponent>
            }
            renderItem={({item}) => (
              <RowComponent
                onPress={() => handleSelectItem(item.value)}
                style={{paddingVertical: 16}}
                justifyContent="flex-start">
                <TextComponent
                  text={item.label}
                  color={
                    dataSelected.includes(item.value) ? 'coral' : colors.text
                  }
                  flex={1}
                />
                {dataSelected.includes(item.value) && (
                  <TickCircle size={22} color="coral" />
                )}
              </RowComponent>
            )}
            keyExtractor={item => item.value}
            showsVerticalScrollIndicator={false}
          />
          <ButtonComponent
            text="Confirm"
            onPress={() => handleConfirmSelect()}
          />
        </View>
      </Modal>
    </View>
  );
}
