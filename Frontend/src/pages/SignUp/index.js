import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('E-mail invalido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6)
    .max(15)
    .required('Password é obrigatório'),
});
export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome Completo" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
        />
        <button type="submit">Criar Usuário</button>
        <Link to="/">Já sou cadastrado...</Link>
      </Form>
    </>
  );
}
