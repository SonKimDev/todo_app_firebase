import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/homes/HomeScreen';
import AddNewTaskScreen from '../screens/tasks/AddNewTaskScreen';

export default function Router() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddNewTask" component={AddNewTaskScreen} />
    </Stack.Navigator>
  );
}
