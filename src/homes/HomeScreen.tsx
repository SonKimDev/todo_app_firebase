import {
  Add,
  Edit2,
  Element4,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import CardComponent from '../components/CardComponent';
import Container from '../components/Container';
import RowComponent from '../components/RowComponent';
import SectionComponent from '../components/SectionComponent';
import TextComponent from '../components/TextComponent';
import TitleComponent from '../components/TitleComponent';
import {colors} from '../constants/colors';
import {globalStyles} from '../styles/globalStyles';
import TagComponent from '../components/TagComponent';
import SpaceComponent from '../components/SpaceComponent';
import CircularComponent from '../components/CircularComponent';
import CardImageContainer from '../components/CardImageContainer';
import AvatarGroup from '../components/AvatarGroup';
import ProgressBarComponent from '../components/ProgressBarComponent';

export default function HomeScreen() {
  return (
    <View style={{flex: 1}}>
      <Container>
        <SectionComponent>
          <RowComponent justifyContent="space-between">
            <Element4 size={24} color={colors.desc} />
            <Notification size={24} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <TextComponent text="Hi, Jason" />
          <TitleComponent text="Be Productive Today" />
        </SectionComponent>
        <SectionComponent>
          <RowComponent
            justifyContent="space-between"
            style={[globalStyles.inputContainer]}
            onPress={() => {}}>
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
        <SectionComponent>
          <RowComponent style={{alignItems: 'flex-start'}}>
            <View style={{flex: 1}}>
              <CardImageContainer>
                <TouchableOpacity style={[globalStyles.iconContainer]}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text="UX Design" />
                <TextComponent text="Task managements mobile app" size={13} />
                <View style={{marginVertical: 28}}>
                  <AvatarGroup />
                  <ProgressBarComponent
                    percent="70%"
                    color="#0AACFF"
                    size="large"
                  />
                </View>
                <TextComponent
                  text="Due, 2024 March 03"
                  size={12}
                  color={colors.desc}
                />
              </CardImageContainer>
            </View>
            <SpaceComponent width={16} />
            <View style={{flex: 1}}>
              <CardImageContainer color="rgba(33, 150, 243, 0.9)">
                <TouchableOpacity style={[globalStyles.iconContainer]}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text="API Payment" />
                <AvatarGroup />
                <ProgressBarComponent percent="40%" color="#A2F068" />
              </CardImageContainer>
              <SpaceComponent height={16} />
              <CardImageContainer color="rgba(18, 181, 22, 0.9)">
                <TouchableOpacity style={[globalStyles.iconContainer]}>
                  <Edit2 size={20} color={colors.white} />
                </TouchableOpacity>
                <TitleComponent text="Update work" />
                <TextComponent text="Revision home page" size={13} />
              </CardImageContainer>
            </View>
          </RowComponent>
        </SectionComponent>
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
          onPress={() => console.log('hehehe')}
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
