import { toast } from 'react-toastify';

export const errorMessage = function errorMessage(e) {
  const error = e.response;
  toast.error(
    !!error && error.data.error
      ? `${error.data.error}`
      : 'Algo de errado aconteceu... Tente novamente'
  );
};
