import * as Yup from 'yup';

export const createUser = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email()
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A Senha é obrigatório')
      .min(6, 'A senha deve ter no mínimo 6-10 caracteres')
      .max(10, 'A senha deve ter no máximo 6-10 characters'),
  });

  try {
    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string()
      .email('E-mail é invalido')
      .required('e-mail é obrigatório'),
    oldPassword: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6-10 caracteres')
      .max(10, 'A senha deve ter no máximo 6-10 characters'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6-10 caracteres')
      .max(10, 'A senha deve ter no máximo 6-10 characters')
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required('Você deve enviar a senha') : field
      ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password
        ? field
            .required('Você deve confirmar a senha')
            .oneOf([Yup.ref('password')])
        : field
    ),
  });

  try {
    if (Object.keys(req.body).length === 0) throw 'Body not sended';

    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
