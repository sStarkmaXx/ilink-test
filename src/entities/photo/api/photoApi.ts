const accessToken = localStorage.getItem('accessToken');
const token = `Bearer ${accessToken}`;

const baseUrl = `https://academtest.ilink.dev/reviews/updatePhoto`;
export const photoApi = {
  sendPhoto(id: string, body: FormData) {
    return fetch(baseUrl + `/${id}`, {
      method: 'POST',
      body: body,
    });
  },
  updateProfilePhoto(body: FormData) {
    return fetch(baseUrl, {
      method: 'POST',
      headers: {
        authorization: `${token}`,
      },
      body: body,
    });
  },
};
