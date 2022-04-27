import {
  createStore,
  createEffect,
  createEvent,
  forward,
  sample,
} from 'effector';

export type accountType = {
  aboutMe: string;
  academyStatus: string;
  birthDate: string;
  cityOfResidence: string;
  createdAt: string;
  deletedAt: null;
  email: string;
  favoriteFood: null;
  firstName: string;
  gender: string;
  hasPet: boolean;
  id: string;
  lastLoginDate: string;
  lastName: string;
  password: string;
  petName: null;
  petType: null;
  profileImage: string;
  smallAboutMe: null;
  updatedAt: string;
  version: number;
};

const initState = {
  aboutMe: '',
  academyStatus: '',
  birthDate: '',
  cityOfResidence: '',
  createdAt: '',
  deletedAt: null,
  email: '',
  favoriteFood: null,
  firstName: '',
  gender: '',
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
  console.log(response);
  console.log(accessToken, token);
  return response;
});

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

export const accountModel = {
  $account,
  getAccount,
};
