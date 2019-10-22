import { showMessage } from 'react-native-flash-message';

export const errorMessage = function ErrorMessage(e) {
  const error = e.response;
  showMessage({
    type: 'danger',
    message:
      !!error && error.data.error
        ? `Ops! ${error.data.error}`
        : 'Um erro ocorreu, verifique se estar conectado a internet',
  });
};

export const successMessage = function ErrorMessage(msg) {
  showMessage({
    type: 'success',
    message: msg,
  });
};
