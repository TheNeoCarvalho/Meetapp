import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as Yup from 'yup';
import authConfig from '../../config/auth';

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não repassado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

export const authCreateSession = async (req, res, next) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('o e-mail é obrigatório'),
    password: Yup.string()
      .required('a senha é obrigatório')
      .min(6, 'A senha deve conter de 6-10 caracteres')
      .max(10, 'A Senha possui entre 6-10 caracteres'),
  });

  try {
    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
