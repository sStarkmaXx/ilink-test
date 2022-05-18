import { newProfileInfoType } from '../model/accountModel';

const accessToken = localStorage.getItem('accessToken');
const token = `Bearer ${accessToken}`;
const baseUrl = 'https://academtest.ilink.dev/user';

export const accountApi = {
  getAccount() {
    return fetch(baseUrl + '/getUserProfile', {
      method: 'GET',
      headers: { authorization: `${token}` },
    });
  },
  updateProfileInfo(newProfileInfo: newProfileInfoType) {
    const body = JSON.stringify(newProfileInfo);
    return fetch(baseUrl + '/updateInfo', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: `${token}`,
      },
      body: body,
    });
  },
  getAllAccounts() {
    return fetch(baseUrl + '/getAll', {
      method: 'GET',
      headers: { authorization: `${token}` },
    });
  },
};
