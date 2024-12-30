import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ButtonComponent from '../../components/ButtonComponent';
import Container from '../../components/Container';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import DropDownPickerComponent from '../../components/DropDownPickerComponent';
import InputComponent from '../../components/InputComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceComponent from '../../components/SpaceComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import UploadFileComponent from '../../components/UploadFileComponent';
import {colors} from '../../constants/colors';
import {SelectModel} from '../../models/SelectModel';
import {AttachmentModel, TaskModel} from '../../models/TaskModel';
import {globalStyles} from '../../styles/globalStyles';
import {calcFileSize} from '../../utils/calcFileSize';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  attachments: [],
};

export default function AddNewTaskScreen() {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [userSelect, setUserSelect] = useState<SelectModel[]>([]);
  const [attachments, setAttachments] = useState<AttachmentModel[]>([]);

  const {top} = useSafeAreaInsets();

  async function handleGetAllUser() {
    await firestore()
      .collection('users')
      .get()
      .then(snap => {
        if (snap.empty) {
          console.log(`users data not found`);
        } else {
          const items: SelectModel[] = [];
          snap.forEach(item => {
            items.push({
              label: item.data().name,
              value: item.id,
            });
          });
          setUserSelect(items);
        }
      });
  }

  function handleChangeValue(id: string, value: string | string[] | Date) {
    const item: any = {...taskDetail};

    item[`${id}`] = value;

    setTaskDetail(item);
  }

  async function handleAddNewTask() {
    const data = {
      ...taskDetail,
      attachments,
    };
    await firestore()
      .collection('tasks')
      .add(data)
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    handleGetAllUser();
  }, []);

  return (
    <View style={[globalStyles.container]}>
      <SpaceComponent height={Platform.OS === 'ios' ? top : top + 10} />
      <Container back title="Add New Task" isScroll>
        <SectionComponent>
          <InputComponent
            value={taskDetail.title}
            onChange={val => handleChangeValue('title', val)}
            title="Title"
            allowClear
            placeHolder="Title of task"
          />
          <InputComponent
            value={taskDetail.description}
            onChange={val => handleChangeValue('description', val)}
            title="Description"
            allowClear
            placeHolder="Content"
            multiline
            numberOfLine={3}
          />
          <DateTimePickerComponent
            selected={taskDetail.dueDate}
            onSelect={val => handleChangeValue('dueDate', val)}
            placeHolder="Choice"
            type="date"
            title="Due date"
          />

          <RowComponent>
            <View style={{flex: 1}}>
              <DateTimePickerComponent
                selected={taskDetail.start}
                onSelect={val => handleChangeValue('start', val)}
                title="Start"
                type="time"
              />
            </View>
            <SpaceComponent width={10} />
            <View style={{flex: 1}}>
              <DateTimePickerComponent
                selected={taskDetail.end}
                onSelect={val => handleChangeValue('end', val)}
                title="End"
                type="time"
              />
            </View>
          </RowComponent>

          <DropDownPickerComponent
            selected={taskDetail.uids}
            items={userSelect}
            onSelect={val => handleChangeValue('uids', val)}
            multiple
            title="Members"
          />
          <View>
            <RowComponent>
              <TitleComponent text="Files and Links" flex={1} />
              <UploadFileComponent
                onUpload={file => setAttachments([...attachments, file])}
              />
            </RowComponent>
            {attachments && attachments.length > 0 ? (
              attachments
                .filter(item => item && item.size !== undefined)
                .map((item, index) => (
                  <RowComponent
                    style={{marginBottom: 8}}
                    key={index}
                    justifyContent="flex-start">
                    <TextComponent text={item?.name ?? '123'} />
                    <SpaceComponent width={8} />
                    <TextComponent
                      text={calcFileSize(item?.size)}
                      color={colors.gray2}
                    />
                  </RowComponent>
                ))
            ) : (
              <TextComponent text="No attachments available." />
            )}
          </View>
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent text="Save" onPress={handleAddNewTask} />
        </SectionComponent>
      </Container>
    </View>
  );
}
