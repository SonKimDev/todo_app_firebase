import {
  Add,
  Edit2,
  Element4,
  Logout,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Platform, Pressable, TouchableOpacity, View} from 'react-native';
import CardComponent from '../../components/CardComponent';
import Container from '../../components/Container';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyles';
import TagComponent from '../../components/TagComponent';
import SpaceComponent from '../../components/SpaceComponent';
import CircularComponent from '../../components/CircularComponent';
import CardImageContainer from '../../components/CardImageContainer';
import AvatarGroup from '../../components/AvatarGroup';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {TaskModel} from '../../models/TaskModel';
import LoadingScreen from '../LoadingScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function HomeScreen({navigation}: any) {
  const user = auth().currentUser;
  const {top} = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  async function getNewTasks() {
    setIsLoading(true);

    await firestore()
      .collection('tasks')
      .orderBy('dueDate', 'desc')
      .limitToLast(3)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log('tasks not found.');
        } else {
          const items: TaskModel[] = [];
          snap.forEach((item: any) =>
            items.push({id: item.id, ...item.data()}),
          );
          setTasks(items);
          setIsLoading(false);
        }
      });
  }

  useEffect(() => {
    getNewTasks();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Container isScroll>
        <View style={{paddingTop: Platform.OS === 'ios' ? top : top + 10}}>
          <SectionComponent>
            <RowComponent justifyContent="space-between">
              <Element4 size={24} color={colors.desc} />
              <Notification size={24} color={colors.desc} />
            </RowComponent>
          </SectionComponent>
          <SectionComponent>
            <RowComponent>
              <View style={{flex: 1}}>
                <TextComponent text={`Hi, ${user?.email}`} />
                <TitleComponent text="Be Productive Today" />
              </View>
              <TouchableOpacity onPress={() => auth().signOut()}>
                <Logout size={22} color="coral" />
              </TouchableOpacity>
            </RowComponent>
          </SectionComponent>
          <SectionComponent>
            <RowComponent
              justifyContent="space-between"
              style={[globalStyles.inputContainer]}
              onPress={() => navigation.navigate('Search')}>
              <TextComponent color="#696B6F" text="Search" />
              <SearchNormal1 size={20} color={colors.desc} />
            </RowComponent>
          </SectionComponent>
          <SectionComponent>
            <CardComponent>
              <RowComponent>
                <View style={{flex: 1}}>
                  <TitleComponent text="Task progress" />
                  <TextComponent text="30/40 tasks done" />
                  <SpaceComponent height={12} />
                  <RowComponent justifyContent="flex-start">
                    <TagComponent
                      text="March 22"
                      onPress={() => console.log('ei yo')}
                    />
                  </RowComponent>
                </View>
                <View>
                  <CircularComponent value={80} />
                </View>
              </RowComponent>
            </CardComponent>
          </SectionComponent>
          {isLoading ? (
            <LoadingScreen />
          ) : tasks.length > 0 ? (
            <SectionComponent>
              <RowComponent style={{alignItems: 'flex-start'}}>
                <View style={{flex: 1}}>
                  <CardImageContainer
                    onPress={() =>
                      navigation.navigate('TaskDetail', {
                        id: tasks[0].id,
                        color: 'rgba(133, 77, 217, 0.9)',
                      })
                    }>
                    <TouchableOpacity
                      style={[globalStyles.iconContainer]}
                      onPress={() =>
                        navigation.navigate('TaskDetail', {
                          id: tasks[0].id,
                          color: 'rgba(133, 77, 217, 0.9)',
                          edit: true,
                        })
                      }>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[0].title} />
                    <TextComponent
                      line={3}
                      text={tasks[0].description}
                      size={13}
                    />
                    <View style={{marginVertical: 28}}>
                      <AvatarGroup uids={tasks[0].uids} />
                      {tasks[0].progress &&
                      (tasks[0].progress as number) >= 0 ? (
                        <ProgressBarComponent
                          percent={`${Math.floor(tasks[0].progress * 100)}%`}
                          color="#0AACFF"
                          size="large"
                        />
                      ) : (
                        <></>
                      )}
                    </View>
                    <TextComponent
                      text={`Due ${new Date(tasks[0].dueDate.toDate())}`}
                      size={12}
                      color={colors.desc}
                    />
                  </CardImageContainer>
                </View>
                <SpaceComponent width={16} />
                <View style={{flex: 1}}>
                  {tasks[1] && (
                    <>
                      <CardImageContainer
                        color="rgba(33, 150, 243, 0.9)"
                        onPress={() =>
                          navigation.navigate('TaskDetail', {
                            id: tasks[1].id,
                            color: 'rgba(33, 150, 243, 0.9)',
                          })
                        }>
                        <TouchableOpacity
                          style={[globalStyles.iconContainer]}
                          onPress={() =>
                            navigation.navigate('TaskDetail', {
                              id: tasks[1].id,
                              color: 'rgba(33, 150, 243, 0.9)',
                              edit: true,
                            })
                          }>
                          <Edit2 size={20} color={colors.white} />
                        </TouchableOpacity>
                        <TitleComponent text={tasks[1].title} />
                        {tasks[1].uids && <AvatarGroup uids={tasks[1].uids} />}
                        {tasks[1].progress &&
                        (tasks[1].progress as number) >= 0 ? (
                          <ProgressBarComponent
                            percent={`${Math.floor(tasks[1].progress * 100)}%`}
                            color="#A2F068"
                          />
                        ) : (
                          <></>
                        )}
                      </CardImageContainer>
                      <SpaceComponent height={16} />
                    </>
                  )}
                  {tasks[2] && (
                    <CardImageContainer
                      color="rgba(18, 181, 22, 0.9)"
                      onPress={() =>
                        navigation.navigate('TaskDetail', {
                          id: tasks[2].id,
                          color: 'rgba(18, 181, 22, 0.9)',
                        })
                      }>
                      <TouchableOpacity
                        style={[globalStyles.iconContainer]}
                        onPress={() =>
                          navigation.navigate('TaskDetail', {
                            id: tasks[2].id,
                            color: 'rgba(18, 181, 22, 0.9)',
                            edit: true,
                          })
                        }>
                        <Edit2 size={20} color={colors.white} />
                      </TouchableOpacity>
                      <TitleComponent text={tasks[2].title} />
                      <TextComponent
                        line={1}
                        text={tasks[2].description}
                        size={13}
                      />
                    </CardImageContainer>
                  )}
                </View>
              </RowComponent>
            </SectionComponent>
          ) : (
            <></>
          )}
          <SectionComponent>
            <TitleComponent text="Urgent tasks" />
            <CardComponent>
              <RowComponent>
                <CircularComponent value={40} radius={36} fontSize={16} />
                <View
                  style={{flex: 1, justifyContent: 'center', paddingLeft: 12}}>
                  <TextComponent text="Title of task" />
                </View>
              </RowComponent>
            </CardComponent>
          </SectionComponent>
          <SpaceComponent height={42} />
        </View>
      </Container>
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
        <Pressable
          onPress={() => navigation.navigate('AddNewTask')}
          style={[
            globalStyles.row,
            {
              backgroundColor: colors.blue,
              padding: 10,
              borderRadius: 999,
              width: '80%',
            },
          ]}>
          <TextComponent text="Add new tasks" />
          <Add size={22} color={colors.white} />
        </Pressable>
      </View>
    </View>
  );
}
