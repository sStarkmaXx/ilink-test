const accessToken = localStorage.getItem('accessToken');
const token = `Bearer ${accessToken}`;

const baseUrl = `https://academtest.ilink.dev`;

export const photoApi = {
  sendPhoto(id: string, body: FormData) {
    return fetch(baseUrl + `/reviews/updatePhoto/${id}`, {
      method: 'POST',
      body: body,
    });
  },
  updateProfilePhoto(body: FormData) {
    return fetch(baseUrl + '/user/updatePhoto', {
      method: 'POST',
      headers: {
        authorization: `${token}`,
      },
      body: body,
    });
  },
};
