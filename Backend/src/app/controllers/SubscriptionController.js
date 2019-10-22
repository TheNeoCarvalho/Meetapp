import { Op } from 'sequelize';
import {
  parseISO,
  startOfMonth,
  endOfMonth,
  startOfHour,
  addHours,
} from 'date-fns';

import Meetapp from '../models/Meetapp';
import User from '../models/User';
import File from '../models/File';

import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';
import Notification from '../schemas/Notification';

class SubscriptionController {
  async index(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);
    const startMonth = startOfMonth(parsedDate);
    const endMonth = endOfMonth(parsedDate);
    const meetapps = await Meetapp.findAll({
      where: {
        date: { [Op.between]: [startMonth, endMonth] },
        subscribers: { [Op.contains]: [req.userId] },
        canceled_at: null,
      },
      order: [['date', 'ASC']],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name'],
        },
      ],
    });

    const meetAppList = meetapps.map(m => ({
      ...m.toJSON(),
      canSubscribe: !m.subscribers.find(user_id => user_id === req.userId),
    }));

    return res.status(200).json(meetAppList);
  }

  async store(req, res) {
    const meetapp = await Meetapp.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    try {
      if (!meetapp) throw new Error('Meetapp não existe');
      if (meetapp.past) throw new Error('Meetapp já finalizado!');
      if (req.userId === meetapp.owner_id)
        throw new Error(`O proprietário do meetapp não pode se inscrever!`);
      if (meetapp.subscribers.includes(req.userId))
        throw new Error('Já inscrito');
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }

    const hourStart = startOfHour(Number(meetapp.date));
    const minimumMeetappHours = 2;

    const conflictMeetapps = await Meetapp.findOne({
      where: {
        subscribers: { [Op.contains]: [req.userId] },
        date: {
          [Op.between]: [hourStart, addHours(hourStart, minimumMeetappHours)],
        },
      },
      attributes: ['id', 'title', 'location', 'date'],
    });

    if (conflictMeetapps)
      return res.status(400).json({
        error: 'Você já está inscrito neste meetapp.',
        conflict: conflictMeetapps,
      });

    const { title, description, location, date, banner } = await meetapp.update(
      {
        subscribers: [req.userId, ...meetapp.subscribers],
      }
    );
    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    await Notification.create({
      user: meetapp.owner_id,
      content: `${user.name} se inscreveu no seu Meetapp ${title}!`,
    });

    await Notification.create({
      user: user.id,
      content: `Agora você está inscrito ${title}!`,
    });

    const { name: userSubName, email: userSubEmail } = await User.findOne({
      where: { id: req.userId },
    });

    await Queue.add(SubscriptionMail.key, {
      userName: user.name,
      meetapp,
      title,
      date,
      userSubName,
      userSubEmail,
    });

    return res.status(200).json({
      title,
      description,
      location,
      date,
      banner,
    });
  }

  async delete(req, res) {
    const meetapp = await Meetapp.findOne({ where: { id: req.params.id } });

    if (!meetapp)
      return res.status(400).json({ error: 'Este meetapp não existe!' });

    if (meetapp.past)
      return res.status(400).json({
        error: 'Você não pode cancelar a inscrição de um meetapp finalizado',
      });

    if (!meetapp.subscribers.includes(req.userId))
      return res.status(400).json({ error: 'Você não está inscrito!' });

    const removeFromSubs = subs => {
      subs.splice(subs.indexOf(req.userId), 1);
      return subs;
    };
    const subscribers = removeFromSubs(meetapp.subscribers);

    await meetapp.update({ subscribers });

    return res.send();
  }
}

export default new SubscriptionController();
