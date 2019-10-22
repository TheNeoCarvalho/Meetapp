import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {
  MdEdit,
  MdDeleteForever,
  MdInsertInvitation,
  MdPlace,
} from 'react-icons/md';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { errorMessage } from '~/utils/Message';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content, Banner, Tooltip, Button } from './styles';

export default function Meetapp({ match }) {
  const [loading, setLoading] = useState(true);
  const [meetapp, setMeetapp] = useState();
  const [subscribed, setSubscribed] = useState(false);
  const [countSubscribed, setcountSubscribed] = useState(1);

  const userId = useSelector(store => store.user.profile.id);

  const id = useMemo(
    () => ({
      value: match.params.id,
      updates: countSubscribed,
    }),
    [countSubscribed, match.params.id]
  );
  useEffect(() => {
    async function loadingMeetapp() {
      try {
        const { data } = await api.get(`meetapps/${id.value}`);
        const showSubs = 5;
        setMeetapp({
          ...data,
          formattedSubscribers: data.subscribers.slice(0, showSubs),
          sumSubscribers: data.subscribers.length - showSubs,
          formattedDate: format(
            parseISO(data.date),
            "d' de 'MMMM' às 'HH'h'mm",
            {
              locale: pt,
            }
          ),
        });
        setSubscribed(data.subscribed);
        setcountSubscribed(data.subscribers.length);
      } catch (e) {
        errorMessage(e);
        history.push('/dashboard');
      } finally {
        setLoading(false);
      }
    }
    loadingMeetapp();
  }, [id]);

  async function handleCancel() {
    try {
      await api.delete(`meetapps/${id.value}`);
      toast.success('Meepapp cencelado com sucesso');
      history.push('/dashboard');
    } catch (e) {
      errorMessage(e);
    }
  }

  async function handleSubscribe(subscriber) {
    try {
      if (subscriber) {
        await api.post(`subscriptions/${id.value}`);
        setcountSubscribed(countSubscribed + 1);
        toast.success(`Você agora estar inscrito em ${meetapp.title}!`);
      } else {
        await api.delete(`subscriptions/${id.value}`);
        setcountSubscribed(countSubscribed - 1);
        toast.warn(`Você cancelou sua inscrição em ${meetapp.title}!`);
      }
    } catch (e) {
      errorMessage(e);
    }
  }

  return (
    <Container>
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          <header>
            <strong>{meetapp.title}</strong>
            {meetapp.canceled_at && <h2 className="cancel">Cancelado</h2>}
            {meetapp.past && <h2 className="fineshed">Encerrado</h2>}
            {!meetapp.canceled_at &&
              !meetapp.past &&
              userId === meetapp.owner.id && (
                <div className="btn">
                  <Button
                    type="button"
                    className="btn-blue"
                    onClick={() => history.push(`/meetapp-edit/${meetapp.id}`)}
                  >
                    <MdEdit />
                    Editar
                  </Button>
                  {meetapp.cancelable && (
                    <Button
                      type="button"
                      className="btn-red"
                      onClick={handleCancel}
                    >
                      <MdDeleteForever />
                      Cancelar
                    </Button>
                  )}
                </div>
              )}
          </header>
          {meetapp.banner && (
            <Banner>
              <img src={meetapp.banner.url} alt="" />
            </Banner>
          )}
          <Content>
            <div className="description">{meetapp.description}</div>
            <div>
              <div className="others-info">
                <MdInsertInvitation />
                <span>{meetapp.formattedDate}</span>
                <MdPlace />
                <span>{meetapp.location}</span>
                <span>
                  criado por <strong>{meetapp.owner.name}</strong>
                </span>
              </div>
              <div className="subscriber">
                {!meetapp.canceled_at &&
                  !meetapp.past &&
                  (meetapp.owner.id !== userId &&
                    (!subscribed ? (
                      <Button
                        className="btn-blue"
                        onClick={() => handleSubscribe(true)}
                        type="button"
                      >
                        Inscrever-se
                      </Button>
                    ) : (
                      <Button
                        className="btn-red"
                        onClick={() => handleSubscribe(false)}
                        type="button"
                      >
                        Cancelar Inscrição
                      </Button>
                    )))}
                <ul>
                  {meetapp.formattedSubscribers.map(subscriber => (
                    <li key={String(subscriber.id)}>
                      <img
                        src={
                          subscriber.avatar
                            ? subscriber.avatar.url
                            : `https://api.adorable.io/avatars/50/${subscriber.name}`
                        }
                        alt={subscriber.name}
                      />
                      <Tooltip className="subscriber-tooltip">
                        {subscriber.name}
                      </Tooltip>
                    </li>
                  ))}
                </ul>
                <span>
                  {meetapp.sumSubscribers > 0
                    ? `+${meetapp.sumSubscribers}`
                    : ''}
                </span>
              </div>
            </div>
          </Content>
        </>
      )}
    </Container>
  );
}

Meetapp.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
