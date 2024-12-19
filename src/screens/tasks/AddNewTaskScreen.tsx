import React from 'react';
import Container from '../../components/Container';
import TextComponent from '../../components/TextComponent';

export default function AddNewTaskScreen() {
  return (
    <Container back title='Add New Task'>
      <TextComponent text='Add New Task'/>
    </Container>
  );
}
