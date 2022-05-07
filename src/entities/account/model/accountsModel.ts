import {
  createStore,
  createEvent,
  createEffect,
  forward,
  sample,
} from 'effector';
import { accountType } from 'pages/accountPage/accountModel';

type accountsStoreType = Array<accountType>;

const $accounts = createStore<accountsStoreType>([]);
const getAccounts = createEvent();

const accessToken = localStorage.getItem('accessToken');
const token = 'Bearer' + ' ' + accessToken;
const getAccountsFX = createEffect(async () => {
  const url = 'https://academtest.ilink.dev/user/getAll';
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

export const accountsModel = {
  $accounts,
  getAccounts,
  $loadingAccounts,
};
