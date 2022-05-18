import {
  createStore,
  createEffect,
  createEvent,
  forward,
  sample,
} from 'effector';
import { toastModel } from 'shared/ui/toast/model/toastModel';
import { accountApi } from '../api/accountApi';

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

//-------------------------------------------------getAccount----------------------------------
const $account = createStore<accountType>(initState);

const getAccountFX = createEffect(() => {
  const response = accountApi
    .getAccount()
    .then((res) => {
      if (res.status === 401) {
        document.location = '/ilink-test/';
      }
      return res.text();
    })
    .then((res) => JSON.parse(res));
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
  (newProfileInfo: newProfileInfoType) => {
    const response = accountApi
      .updateProfileInfo(newProfileInfo)
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

//---------------------------------------------------getAllAccounts--------------------------------
type accountsStoreType = Array<accountType>;

const $accounts = createStore<accountsStoreType>([]);
const getAccounts = createEvent();

const getAccountsFX = createEffect(() => {
  const response = accountApi
    .getAllAccounts()
    .then((res) => {
      if (res.status === 401) {
        document.location = '/ilink-test/';
      }
      return res.text();
    })
    .then((res) => JSON.parse(res));
  return response;
});

forward({
  from: getAccounts,
  to: getAccountsFX,
});

sample({
  clock: getAccountsFX.doneData,
  fn: (clock) => clock,
  target: $accounts,
});

const $loadingAccounts = getAccountsFX.pending;

export const accountModel = {
  $account,
  getAccount,
  $isLoading,
  updateProfileInfo,
  $accounts,
  getAccounts,
  $loadingAccounts,
};
