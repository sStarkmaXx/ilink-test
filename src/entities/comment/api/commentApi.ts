import { newCommentType } from '../model/comment';

const accessToken = localStorage.getItem('accessToken');
const token = `Bearer ${accessToken}`;
const baseUrl = 'https://academtest.ilink.dev/reviews';

export const commentApi = {
  getAllComments() {
    return fetch(baseUrl + '/getAll', {
      method: 'GET',
      headers: { authorization: `${token}` },
    });
  },
  sendNewComment(comment: newCommentType) {
    let body =
      'authorName=' +
      comment.authorName +
      '&title=' +
      comment.title +
      '&text=' +
      comment.text +
      '&captchaKey=' +
      comment.captchaKey +
      '&captchaValue=' +
      comment.captchaValue;
    return fetch(baseUrl + '/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body,
    });
  },
  updateComment(id: string, text: string) {
    const body = 'text=' + text;
    return fetch(baseUrl + `/updateInfo/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: `${token}`,
      },
      body: body,
    });
  },
  changeCommentStatus(id: string, status: string) {
    const body = 'status=' + status;
    return fetch(baseUrl + `/updateStatus/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: `${token}`,
      },
      body: body,
    });
  },
};
