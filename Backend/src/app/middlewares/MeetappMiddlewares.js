import * as Yup from 'yup';

const title = Yup.string().max(
  45,
  'Título não pode conter mais que 45 caracteres.'
);
const description = Yup.string().max(
  500,
  'Descrição não pode conter mais que 500 caracteres.'
);
const location = Yup.string().max(
  150,
  'Localização não pode conter mais que 150 caracteres.'
);
const date = Yup.date('Data inválida!');

export const createMeetapp = async (req, res, next) => {
  const schema = Yup.object().shape({
    title: title.required('O Título não pode ficar em branco!'),
    description: description.required('A Descrição não pode ficar em branco!'),
    location: location.required('A Localização não pode ficar em branco! '),
    date: date.required('A Date não pode ficar em branco!'),
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
