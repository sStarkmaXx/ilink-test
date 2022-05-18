import { createEffect, createEvent, sample, forward } from 'effector';
import { toastModel } from 'shared/ui/toast';
import { accessTokenApi } from '../api/accessTokenApi';

export type loginDataType = {
  login: string;
  password: string;
};

const fetchAccessTokenFX = createEffect(
  ({ login, password }: loginDataType) => {
    const resp = accessTokenApi
      .getAccessToken(login, password)
      .then((res) => {
        return res.text();
      })
      .then((res) => JSON.parse(res))
      .then((res) => {
        console.log(res);
        if (!res.statusCode) {
          localStorage.setItem('accessToken', res.accessToken);
          document.location = '/ilink-test/profile';
        } else if (res.statusCode === 400) {
          toastModel.showHideToast('Неверный пароль!');
          setTimeout(() => toastModel.showHideToast(null), 2000);
        } else if (res.statusCode === 500) {
          toastModel.showHideToast('Данный пользователь не зарегистрирован!');
          setTimeout(() => toastModel.showHideToast(null), 2000);
        } else {
          toastModel.showHideToast('Не известная ошибка, попробуйте позже!');
          setTimeout(() => toastModel.showHideToast(null), 2000);
        }
      })
      .catch((er) => console.error('Ошибка!!!', er));

    return resp;
  }
);

const getAccessToken = createEvent<loginDataType>();

forward({
  from: getAccessToken,
  to: fetchAccessTokenFX,
});

sample({
  clock: getAccessToken,
  fn: (clock) => clock,
  target: fetchAccessTokenFX,
});

export const accessTokenModel = {
  getAccessToken,
};
