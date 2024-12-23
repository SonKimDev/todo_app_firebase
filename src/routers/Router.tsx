import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import HomeScreen from '../screens/homes/HomeScreen';
import AddNewTaskScreen from '../screens/tasks/AddNewTaskScreen';
import SearchScreen from '../screens/SearchScreen';
import auth from '@react-native-firebase/auth';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import {Text, View} from 'react-native';
import LoadingScreen from '../screens/LoadingScreen';

export default function Router() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setIsLogin(true);
        setIsLoading(false);
      } else {
        setIsLogin(false);
        setIsLoading(false);
      }
    });
  }, []);

  const Stack = createNativeStackNavigator();

  const MainRouter = (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddNewTask" component={AddNewTaskScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );

  const AuthRouter = (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return isLogin ? MainRouter : AuthRouter;
}
