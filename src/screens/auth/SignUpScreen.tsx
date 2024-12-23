import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import SectionComponent from '../../components/SectionComponent';
import TitleComponent from '../../components/TitleComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import InputComponent from '../../components/InputComponent';
import {colors} from '../../constants/colors';
import {Lock, Sms} from 'iconsax-react-native';
import ButtonComponent from '../../components/ButtonComponent';
import SpaceComponent from '../../components/SpaceComponent';
import {globalStyles} from '../../styles/globalStyles';
import TextComponent from '../../components/TextComponent';
import auth from '@react-native-firebase/auth';

export default function SignUpScreen({navigation}: any) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(id: string, value: string) {
    const item: any = {...form};

    item[`${id}`] = value;

    setForm(item);
  }

  async function submit() {
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    setIsLoading(true);
    await auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(userCredential => {
        const user = userCredential.user;
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setError(error.message);
      });
  }

  useEffect(() => {
    if (form.email || form.password) {
      setError('');
    }
  }, [form]);

  return (
    <Container>
      <SectionComponent styles={{flex: 1, justifyContent: 'center'}}>
        <TitleComponent
          text="Sign Up"
          size={32}
          font={fontFamilies.bold}
          styles={{textTransform: 'uppercase', textAlign: 'center'}}
        />

        <View style={{marginVertical: 20}}>
          <InputComponent
            value={form.email}
            onChange={val => handleChange('email', val)}
            prefix={<Sms size={20} color={colors.desc} />}
            placeHolder="Email"
            title="Email"
            allowClear
          />
          <InputComponent
            value={form.password}
            onChange={val => handleChange('password', val)}
            prefix={<Lock size={20} color={colors.desc} />}
            placeHolder="Password"
            title="Password"
            isPassword
          />
          {error && <TextComponent text={error} color="coral" />}
        </View>

        <ButtonComponent
          text="Sign Up"
          onPress={submit}
          isLoading={isLoading}
        />

        <SpaceComponent height={20} />

        <Text style={[globalStyles.text, {textAlign: 'center'}]}>
          Do you already have an account?{' '}
          <Text style={{color: 'coral'}} onPress={() => navigation.goBack()}>
            Login
          </Text>
        </Text>
      </SectionComponent>
    </Container>
  );
}
