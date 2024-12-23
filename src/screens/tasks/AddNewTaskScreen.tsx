import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import InputComponent from '../../components/InputComponent';
import SectionComponent from '../../components/SectionComponent';
import {TaskModel} from '../../models/TaskModel';
import {Button, View} from 'react-native';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import RowComponent from '../../components/RowComponent';
import SpaceComponent from '../../components/SpaceComponent';
import DropDownPickerComponent from '../../components/DropDownPickerComponent';
import {SelectModel} from '../../models/SelectModel';
import firestore from '@react-native-firebase/firestore';
const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: [],
};

export default function AddNewTaskScreen({navigation}: any) {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [userSelect, setUserSelect] = useState<SelectModel[]>([]);

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

  function handleAddNewTask() {
    console.log(taskDetail);
  }

  useEffect(() => {
    handleGetAllUser();
  }, []);

  return (
    <Container back title="Add New Task">
      <SectionComponent>
        <InputComponent
          value={taskDetail.title}
          onChange={val => handleChangeValue('title', val)}
          title="title"
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
      </SectionComponent>
      <SectionComponent>
        <Button title="Save" onPress={handleAddNewTask} />
      </SectionComponent>
    </Container>
  );
}
