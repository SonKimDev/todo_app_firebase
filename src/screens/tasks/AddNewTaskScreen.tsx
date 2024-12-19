import React, { useState } from 'react';
import Container from '../../components/Container';
import InputComponent from '../../components/InputComponent';
import SectionComponent from '../../components/SectionComponent';
import { TaskModel } from '../../models/TaskModel';
import { Button } from 'react-native';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: '',
  start: '',
  end: '',
  uids: [],
  fileUrls: [],
};

export default function AddNewTaskScreen({navigation}: any) {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);

  function handleChangeValue(id: string, value: string) {
    const item: any = {...taskDetail};

    item[`${id}`] = value;

    setTaskDetail(item);
  }

  function handleAddNewTask() {
    console.log(taskDetail);
    
  }

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
      </SectionComponent>
      <SectionComponent>
        <Button title='Save' onPress={handleAddNewTask}/>
      </SectionComponent>
    </Container>
  );
}
