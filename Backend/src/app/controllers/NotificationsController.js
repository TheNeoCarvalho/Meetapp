import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationsController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: { id: req.userId },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'Somente o proprietário pode carregar notificações' });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationsController();
