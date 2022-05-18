const baseUrl = 'https://academtest.ilink.dev/user/signIn';

export const accessTokenApi = {
  getAccessToken(login: string, password: string) {
    return fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${login}&password=${password}`,
    });
  },
};
