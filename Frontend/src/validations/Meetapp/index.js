import * as Yup from 'yup';

const schema = Yup.object().shape({
  banner_id: Yup.number()
    .transform(value => (!value ? undefined : value))
    .required('O Banner obrigatório'),
  title: Yup.string().required('O Titulo obrigatório'),
  description: Yup.string().required('O Descrição obrigatório'),
  date: Yup.string().required('A Data obrigatório'),
  location: Yup.string().required('A Localização obrigatório'),
});

export default schema;
