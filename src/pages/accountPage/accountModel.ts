import {
  createStore,
  createEffect,
  createEvent,
  forward,
  sample,
} from 'effector';
import { toastModel } from 'shared/ui/toast/toastModel';

export type genderType = 'male' | 'female';

export type accountType = {
  aboutMe: string;
  academyStatus: string;
  birthDate: Date;
  cityOfResidence: string;
  createdAt: string;
  deletedAt: null;
  email: string;
  favoriteFood: null;
  firstName: string;
  gender: genderType;
  hasPet: boolean;
  id: string;
  lastLoginDate: string;
  lastName: string;
  password: string;
  petName: null;
  petType: null;
  profileImage: string;
  smallAboutMe: string | null;
  updatedAt: string;
  version: number;
};

const initState: accountType = {
  aboutMe: '',
  academyStatus: '',
  birthDate: new Date(),
  cityOfResidence: '',
  createdAt: '',
  deletedAt: null,
  email: '',
  favoriteFood: null,
  firstName: '',
  gender: 'male',
  hasPet: false,
  id: '',
  lastLoginDate: '',
  lastName: '',
  password: '',
  petName: null,
  petType: null,
  profileImage: '',
  smallAboutMe: null,
  updatedAt: '',
  version: 1,
};

const $account = createStore<accountType>(initState);

const accessToken = localStorage.getItem('accessToken');
const token = 'Bearer' + ' ' + accessToken;

const getAccountFX = createEffect(async () => {
  const url = 'https://academtest.ilink.dev/user/getUserProfile ';
  const response = await fetch(url, {
    method: 'GET',
    headers: { authorization: `${token}` },
  })
    .then((res) => {
      if (res.status === 401) {
        document.location = '/ilink-test/';
      }
      return res.text();
    })
    .then((res) => JSON.parse(res));
  console.log('prifile', response);
  // console.log(accessToken, token);
  return response;
});

const $isLoading = getAccountFX.pending;

const getAccount = createEvent();

forward({
  from: getAccount,
  to: getAccountFX,
});

sample({
  clock: getAccountFX.doneData,
  fn: (clock) => clock,
  target: $account,
});

//---------------------------------------------------updateProfile--------------------------------

export type newProfileInfoType = {
  firstName: string;
  lastName: string;
  birthDate: string;
  cityOfResidence: string;
  gender: genderType;
  hasPet: boolean;
  smallAboutMe: string | null;
  aboutMe: string;
};

const updateProfileInfoFX = createEffect(
  async (newProfileInfo: newProfileInfoType) => {
    const url = 'https://academtest.ilink.dev/user/updateInfo';
    const body = JSON.stringify(newProfileInfo);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: `${token}`,
      },
      body: body,
    })
      .then((res) => {
        if (res.status === 401) {
          document.location = '/ilink-test/';
        }
        if (res.status >= 200 && res.status < 300) {
          toastModel.setToastError(false);
          toastModel.showHideToast('Информация успешно обновлена!');
          setTimeout(() => toastModel.showHideToast(null), 2000);
        }
        if (res.status >= 300 && res.status < 500) {
          toastModel.showHideToast('Ошибка, попробуйте позже!');
          setTimeout(() => toastModel.showHideToast(null), 2000);
          toastModel.setToastError(true);
        }
        return res.text();
      })
      .then((res) => JSON.parse(res));
    console.log('updateProfileInfo', response);
    // console.log(accessToken, token);
    return response;
  }
);

const updateProfileInfo = createEvent<newProfileInfoType>();

forward({
  from: updateProfileInfo,
  to: updateProfileInfoFX,
});

sample({
  clock: updateProfileInfo,
  source: updateProfileInfo,
  fn: (source) => source,
  target: updateProfileInfoFX,
});

export const accountModel = {
  $account,
  getAccount,
  $isLoading,
  updateProfileInfo,
};
