import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

class UserController {
  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return res.status(400).json({ error: 'O e-mail já estar registrado!' });
    }
    const user = await User.create(req.body);
    const { id, name, email } = user;

    await Notification.create({
      user: id,
      content: `Bem vindo ao Meetapp!`,
    });

    return res.status(201).json({
      user: {
        id,
        name,
        email,
        avatar: null,
      },
      token: user.generateToken(),
    });
  }

  async update(req, res) {
    const { email, oldPassword, avatar_id } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExist = await User.findOne({
        where: { email },
      });
      if (userExist) {
        return res.status(422).json({ error: 'Usuário já existe!' });
      }
    }

    if (avatar_id) {
      const image = await File.findByPk(avatar_id);
      if (!image)
        return res.status(400).json({ error: 'Avatar não encontrado!' });
      if (image.type !== 'avatar')
        return res
          .status(400)
          .json({ error: 'Seu avatar deve ser uma foto para o perfil!' });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'As senhas não correspondem!' });
    }

    await user.update(req.body);

    const { id, name, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
    });
  }
}

export default new UserController();
