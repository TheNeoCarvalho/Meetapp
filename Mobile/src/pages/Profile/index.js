import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';
import Header from '~/components/Header';

import {
  Container,
  Form,
  FormInput,
  Separator,
  SubmitButton,
  LogoutButton,
} from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const oldPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <>
      <Background>
        <Header />
        <Container>
          <Form>
            <FormInput
              icon="person-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nome Completo"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              value={name}
              onChangeText={setName}
            />
            <FormInput
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Seu Email"
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => oldPasswordRef.current.focus()}
              value={email}
              onChangeText={setEmail}
            />

            <Separator />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Sua antiga senha"
              ref={oldPasswordRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Sua nova senha"
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              value={password}
              onChangeText={setPassword}
            />
            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Confirme sua nova senha"
              ref={confirmPasswordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <SubmitButton icon="save" onPress={handleSubmit}>
              Atualizar
            </SubmitButton>
            <LogoutButton icon="settings-power" onPress={handleSignOut}>
              Sair
            </LogoutButton>
          </Form>
        </Container>
      </Background>
    </>
  );
}
Profile.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
