import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {AttachSquare} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
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
import {colors} from '../../constants/colors';
import {SelectModel} from '../../models/SelectModel';
import {TaskModel} from '../../models/TaskModel';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: [],
};

export default function AddNewTaskScreen() {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [userSelect, setUserSelect] = useState<SelectModel[]>([]);
  const [attackments, setAttackments] = useState<DocumentPickerResponse[]>([]);
  const [attackmentUrl, setAttackmentUrl] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  function handlePickerDocument() {
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
      copyTo: 'cachesDirectory',
    })
      .then(res => {
        setAttackments(res);
        res.forEach(item => handleUploadFileToStorage(item));
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function handleUploadFileToStorage(item: DocumentPickerResponse) {
    try {
      const filename = item.name
        ? item.name + `${Date.now()}`
        : `file${Date.now()}`;
      const path = `documents/${filename}`;
      const items = [...attackmentUrl];

      await storage().ref(path).putFile(item.fileCopyUri!);

      const url = await storage().ref(path).getDownloadURL();

      items.push(url);
      setAttackmentUrl(items);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  }

  async function handleAddNewTask() {
    const data = {
      ...taskDetail,
      fileUrls: attackmentUrl,
    };
    setIsLoading(true);
    await firestore()
      .collection('tasks')
      .add(data)
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    handleGetAllUser();
  }, []);

  return (
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
          <RowComponent
            justifyContent="flex-start"
            onPress={handlePickerDocument}>
            <TitleComponent text="Attackments" />
            <SpaceComponent width={8} />
            <AttachSquare size={20} color={colors.white} />
          </RowComponent>
          {attackments.length > 0 &&
            attackments.map((item, index) => (
              <RowComponent
                key={index}
                justifyContent="flex-start"
                style={{paddingVertical: 12}}>
                <TextComponent text={item.name ?? ''} />
              </RowComponent>
            ))}
        </View>
      </SectionComponent>
      <SectionComponent>
        <ButtonComponent
          text="Save"
          onPress={handleAddNewTask}
          isLoading={isLoading}
        />
      </SectionComponent>
    </Container>
  );
}
