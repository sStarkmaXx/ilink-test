const url = 'https://academtest.ilink.dev/reviews/getCaptcha';

export const captchaApi = {
  getCaptcha() {
    return fetch(url, {
      method: 'GET',
    });
  },
};
