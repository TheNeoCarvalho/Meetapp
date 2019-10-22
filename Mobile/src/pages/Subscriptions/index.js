import React, { useState, useEffect, useMemo } from 'react';

import { format, subMonths, addMonths, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { errorMessage, successMessage } from '~/util/Message';

import api from '~/services/api';

import {
  Container,
  ContainerHeader,
  List,
  ButtonDate,
  TextDate,
  NoMeetapps,
  NoMeetappsText,
} from './styles';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetapp from '~/components/Meetapp';

export default function Subscriptions() {
  const [meetapps, setMeetapps] = useState([]);
  const [date, setDate] = useState(new Date());
  const [refreshing] = useState(false);
  const [noMeetapp] = useState([1]);

  const dateFormatted = useMemo(
    () => format(date, 'MMMM yyyy', { locale: pt }),
    [date]
  );
  useEffect(() => {
    async function loadMeetapps() {
      try {
        const response = await api.get('subscriptions', { params: { date } });
        console.tron.log(response);
        const data = response.data.map(m => ({
          ...m,
          formattedDate: format(
            parseISO(m.date),
            "d ' de 'MMMM', às 'hh'h'mm",
            {
              locale: pt,
            }
          ),
        }));
        setMeetapps(data);
      } catch (e) {
        errorMessage(e);
      }
    }
    loadMeetapps();
  }, [date]);

  function handlePrevDay() {
    setDate(subMonths(date, 1));
  }

  function handleNextDay() {
    setDate(addMonths(date, 1));
  }
  function handleRefresh() {
    setDate(subMonths(date, 0));
  }
  async function handleSubscribe(id) {
    try {
      await api.post(`subscriptions/${id}`);
      handleRefresh();
      successMessage('Você tem uma inscrição no meetup!');
    } catch (e) {
      errorMessage(e);
    }
  }

  async function handleUninscribe(id) {
    try {
      await api.delete(`subscriptions/${id}`);
      handleRefresh();
      successMessage('Meepapp cancelado com sucesso!');
    } catch (e) {
      errorMessage(e);
    }
  }

  return (
    <>
      <Background>
        <Header />
        <Container>
          <ContainerHeader>
            <ButtonDate onPress={handlePrevDay}>
              <Icon name="navigate-before" size={36} color="#fff" />
            </ButtonDate>
            <TextDate>{dateFormatted}</TextDate>
            <ButtonDate onPress={handleNextDay}>
              <Icon name="navigate-next" size={36} color="#fff" />
            </ButtonDate>
          </ContainerHeader>
          {meetapps.length > 0 ? (
            <List
              data={meetapps}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <Meetapp
                  data={item}
                  handleSubscribe={() => handleSubscribe(item.id)}
                  handleUninscribe={() => handleUninscribe(item.id)}
                />
              )}
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />
          ) : (
            <List
              data={noMeetapp}
              keyExtractor={item => String(item)}
              renderItem={() => (
                <NoMeetapps>
                  <NoMeetappsText>Nenhum meetapp este mês</NoMeetappsText>
                </NoMeetapps>
              )}
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />
          )}
        </Container>
      </Background>
    </>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
