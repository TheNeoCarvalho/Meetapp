import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Mail from '../../lib/Mail';

const formatDate = data =>
  format(data, "d' de 'MMMM' às 'HH'h'mm", { locale: pt });

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { userName, meetapp, title, date, userSubName, userSubEmail } = data;
    await Mail.sendMail({
      to: `${meetapp.owner.name} <${meetapp.owner.email}>`,
      subject: `${userName} nova inscrição no seu Meetapp ${title}!`,
      template: 'subscription',
      context: {
        ownerName: meetapp.owner.name,
        meetappTitle: title,
        meetappDate: formatDate(parseISO(date)),
        sendDate: formatDate(new Date()),
        userSubName,
        userSubEmail,
      },
    });
  }
}

export default new SubscriptionMail();
