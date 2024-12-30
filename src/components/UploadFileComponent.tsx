import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AttachmentModel} from '../models/TaskModel';
import {DocumentUpload} from 'iconsax-react-native';
import {colors} from '../constants/colors';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {globalStyles} from '../styles/globalStyles';
import TitleComponent from './TitleComponent';
import SpaceComponent from './SpaceComponent';
import TextComponent from './TextComponent';
import {calcFileSize} from '../utils/calcFileSize';
import {Slider} from '@miblanchard/react-native-slider';
import RowComponent from './RowComponent';
import storage from '@react-native-firebase/storage';

interface Props {
  onUpload: (file: AttachmentModel) => void;
}

export default function UploadFileComponent(props: Props) {
  const {onUpload} = props;

  const [file, setFile] = useState<DocumentPickerResponse>();
  const [isVisibleModalUpload, setIsVisibleModalUpload] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [attachmentFile, setAttachmentFile] = useState<AttachmentModel>();

  async function handleUploadFileToStorage() {
    if (file) {
      setIsVisibleModalUpload(true);
      const filename = file.name
        ? file.name + `${Date.now()}`
        : `file${Date.now()}`;
      const path = `documents/${filename}`;

      const res = storage().ref(path).putFile(file.fileCopyUri!);

      res.on('state_changed', task => {
        setProgressUpload(task.bytesTransferred / task.totalBytes);
      });

      res.then(async () => {
        await storage()
          .ref(path)
          .getDownloadURL()
          .then(url => {
            const data: AttachmentModel = {
              name: file.name ?? '',
              url,
              size: file.size ?? 0,
            };

            setAttachmentFile(data);
          });
      });

      res.catch(error => {
        console.log(error.message);
      });
    }
  }

  useEffect(() => {
    file && handleUploadFileToStorage();
  }, [file]);

  useEffect(() => {
    onUpload(attachmentFile as AttachmentModel);
    setIsVisibleModalUpload(false);
  }, [attachmentFile]);

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          DocumentPicker.pick({
            copyTo: 'cachesDirectory',
            allowMultiSelection: false,
            type: [
              DocumentPicker.types.doc,
              DocumentPicker.types.pdf,
              DocumentPicker.types.xls,
            ],
          })
            .then(res => {
              setFile(res[0]);
            })
            .catch(error => {
              console.log(error);
            })
        }>
        <DocumentUpload size={24} color={colors.white} />
      </TouchableOpacity>
      <Modal
        visible={isVisibleModalUpload}
        animationType="slide"
        transparent
        statusBarTranslucent
        style={{flex: 1}}>
        <View
          style={[
            globalStyles.container,
            {
              backgroundColor: `${colors.gray}80`,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            },
          ]}>
          <View
            style={[
              globalStyles.shadow,
              {
                padding: 12,
                backgroundColor: colors.white,
                width: '80%',
                borderRadius: 12,
                height: 'auto',
              },
            ]}>
            <TitleComponent text="Uploading" color={colors.bgColor} flex={0} />
            <SpaceComponent height={12} />
            <View>
              <TextComponent
                color={colors.bgColor}
                text={file?.name ?? ''}
                flex={0}
              />
              <TextComponent
                color={colors.gray2}
                text={`${calcFileSize(file?.size as number)}`}
                flex={0}
              />
            </View>
            <RowComponent>
              <View style={{flex: 1, marginRight: 12}}>
                <Slider
                  disabled
                  value={progressUpload}
                  renderThumbComponent={() => null}
                  trackStyle={{height: 6, borderRadius: 999}}
                  minimumTrackTintColor={colors.success}
                  maximumTrackTintColor={colors.desc}
                />
              </View>
              <TextComponent text={`${progressUpload * 100}%`} flex={0} />
            </RowComponent>
          </View>
        </View>
      </Modal>
    </>
  );
}
