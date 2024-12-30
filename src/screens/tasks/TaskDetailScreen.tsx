import {Slider} from '@miblanchard/react-native-slider';
import firestore from '@react-native-firebase/firestore';
import {
  AddSquare,
  ArrowLeft2,
  Calendar,
  Clock,
  TickCircle,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';
import AvatarGroup from '../../components/AvatarGroup';
import CardComponent from '../../components/CardComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceComponent from '../../components/SpaceComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import UploadFileComponent from '../../components/UploadFileComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {AttachmentModel, TaskModel} from '../../models/TaskModel';
import {globalStyles} from '../../styles/globalStyles';
import {HandleDateTime} from '../../utils/handleDateTime';
import LoadingScreen from '../LoadingScreen';
import {calcFileSize} from '../../utils/calcFileSize';

export default function TaskDetailScreen({navigation, route}: any) {
  const {id, color, edit} = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>();
  const [progress, setProgress] = useState(0);
  const [subTasks, setSubTasks] = useState<any[]>([]);
  const [attachments, setAttachments] = useState<AttachmentModel[]>([]);

  async function handleUpdateTask() {
    if (!taskDetail) return;

    const data = {
      ...taskDetail,
      progress,
      attachments: attachments ?? [],
    };

    try {
      await firestore().doc(`tasks/${id}`).update(data);
      console.log('đã chạy vào đây', data);
      Alert.alert('Success', 'Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      Alert.alert('Error', error.message || 'Task update failed');
    }
  }

  function getTaskDetai() {
    firestore()
      .doc(`tasks/${id}`)
      .onSnapshot((snap: any) => {
        if (snap.exists) {
          setTaskDetail({id, ...snap.data()});
        } else {
          console.log(`Task detail not found!!`);
        }
      });
  }

  useEffect(() => {
    getTaskDetai();
  }, [id]);

  useEffect(() => {
    if (taskDetail) {
      setProgress(taskDetail.progress ?? 0);
      setAttachments(taskDetail.attachments ?? []);
    }
  }, [taskDetail]);

  return taskDetail ? (
    <>
      <ScrollView style={[globalStyles.container]}>
        <SectionComponent
          styles={{
            backgroundColor: color ?? 'rgba(113, 77, 217, 0.9)',
            paddingVertical: 20,
            paddingTop: 48,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}>
          <RowComponent justifyContent="flex-start">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft2 size={24} color={colors.text} />
            </TouchableOpacity>
            <SpaceComponent width={12} />
            <TitleComponent
              size={22}
              text={taskDetail.title}
              flex={1}
              styles={{marginBottom: 0, lineHeight: 30}}
            />
          </RowComponent>
          <SpaceComponent height={30} />
          <TextComponent text="Due date" />
          <SpaceComponent height={8} />
          <RowComponent justifyContent="space-between">
            <RowComponent justifyContent="flex-start">
              <Clock size={18} color={colors.text} />
              <SpaceComponent width={8} />
              <TextComponent
                text={`${HandleDateTime.formatTimestampToAMPM(
                  taskDetail.start,
                )} - ${HandleDateTime.formatTimestampToAMPM(taskDetail.end)}`}
              />
            </RowComponent>
            <RowComponent justifyContent="flex-start">
              <Calendar size={18} color={colors.text} />
              <SpaceComponent width={8} />
              <TextComponent
                text={HandleDateTime.formatTimestampToMonthDay(
                  taskDetail.start,
                )}
              />
            </RowComponent>
            <RowComponent justifyContent="flex-end">
              <AvatarGroup uids={taskDetail.uids} />
            </RowComponent>
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <TitleComponent
            text="Description"
            size={20}
            styles={{lineHeight: 40}}
          />
          <CardComponent
            bgColor={colors.bgColor}
            styles={{
              borderWidth: 1,
              borderColor: colors.gray,
              borderRadius: 12,
              marginTop: 12,
            }}>
            <TextComponent
              text={taskDetail.description}
              styles={{textAlign: 'justify'}}
            />
          </CardComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <TitleComponent text="Files and Links" flex={1} />
            {edit && (
              <UploadFileComponent
                onUpload={file => setAttachments([...attachments, file])}
              />
            )}
          </RowComponent>
          {attachments.map((item, index) => (
            <View
              key={index}
              style={{marginVertical: 8, justifyContent: 'flex-start'}}>
              <TextComponent text={item.name} />
              <SpaceComponent width={8} />
              <TextComponent
                text={calcFileSize(item.size)}
                color={colors.gray2}
              />
            </View>
          ))}
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 999,
                borderWidth: 2,
                borderColor: colors.success,
                marginRight: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: colors.success,
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                }}></View>
            </View>
            <TextComponent
              text="Progress"
              flex={1}
              font={fontFamilies.medium}
              size={18}
              height={24}
            />
          </RowComponent>
          <SpaceComponent height={12} />
          <RowComponent>
            <View style={{flex: 1}}>
              <Slider
                disabled={!edit}
                value={progress}
                thumbTintColor={colors.success}
                maximumTrackTintColor={colors.gray2}
                minimumTrackTintColor={colors.success}
                trackStyle={{height: 8, borderRadius: 999}}
                thumbStyle={{
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  borderWidth: 2,
                  borderColor: colors.white,
                }}
                onValueChange={value => setProgress(value[0])}
              />
            </View>
            <SpaceComponent width={20} />
            <TextComponent
              text={`${Math.floor(progress * 100)}%`}
              font={fontFamilies.bold}
              size={20}
              height={24}
            />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent justifyContent="space-between">
            <TitleComponent
              text="Sub tasks"
              size={20}
              styles={{lineHeight: 30}}
            />
            <TouchableOpacity>
              <AddSquare size={22} color={colors.success} variant="Bold" />
            </TouchableOpacity>
          </RowComponent>
          <SpaceComponent height={12} />
          {Array.from({length: 3}).map((item, index) => (
            <CardComponent key={index} styles={{marginBottom: 12}}>
              <RowComponent justifyContent="flex-start">
                <TickCircle variant="Bold" color={colors.success} size={22} />
                <SpaceComponent width={8} />
                <TextComponent text="fafa" />
              </RowComponent>
            </CardComponent>
          ))}
        </SectionComponent>
      </ScrollView>
      {edit && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => handleUpdateTask()}
            style={[
              globalStyles.row,
              {
                backgroundColor: colors.blue,
                padding: 10,
                borderRadius: 10,
                width: '80%',
                zIndex: 999,
              },
            ]}>
            <TextComponent text="Update" />
          </TouchableOpacity>
        </View>
      )}
    </>
  ) : (
    <LoadingScreen />
  );
}
