import { photoModel } from '../photo/photo';
import {
  createEffect,
  createStore,
  createEvent,
  forward,
  sample,
} from 'effector';

type commentStatusType = string;
//'onCheck';

export type commentType = {
  authorImage: string;
  authorName: string;
  createdAt: string;
  deletedAt: null;
  id: string;
  status: commentStatusType;
  text: string;
  title: 'Test Review';
  updatedAt: string;
  version: number;
};

const $comments = createStore<commentType[]>([]);

const accessToken = localStorage.getItem('accessToken');
const token = 'Bearer' + ' ' + accessToken;

//-------------------------------------получаем все комменты----------------------------------
const getCommentsFX = createEffect(async () => {
  const url = 'https://academtest.ilink.dev/reviews/getAll';
  const response = await fetch(url, {
    method: 'GET',
    headers: { authorization: `${token}` },
  })
    .then((res) => res.text())
    .then((res) => JSON.parse(res));
  //console.log(response);
  return response;
});

const getComments = createEvent();

forward({
  from: getComments,
  to: getCommentsFX,
});

sample({
  clock: getCommentsFX.doneData,
  fn: (clock) => clock,
  target: $comments,
});

//---------------------------------------------создаем новый коммент------------------------------------

export type newCommentType = {
  authorName: string;
  title: 'Test Review';
  text: string;
  captchaKey: string;
  captchaValue: string;
};

const setNewComment = createEvent<newCommentType>();

const $newComment = createStore<newCommentType>({
  authorName: '',
  text: '',
  title: 'Test Review',
  captchaKey: '',
  captchaValue: '',
});

$newComment.on(setNewComment, (state, comment) => ({
  ...state,
  authorName: comment.authorName,
  text: comment.text,
  title: comment.title,
  captchaKey: comment.captchaKey,
  captchaValue: comment.captchaValue,
}));

forward({
  from: setNewComment,
  to: $newComment,
});

const $sendCommentError = createStore<string | null>(null);
const setError = createEvent<string | null>();

sample({
  clock: setError,
  fn: (clock) => clock,
  target: $sendCommentError,
});

const sendCommentFX = createEffect(async (comment: newCommentType) => {
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
  const url = 'https://academtest.ilink.dev/reviews/create';
  console.log(comment);
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body,
  })
    .then((res) => res.text())
    .then((res) => {
      console.log(res);
      return JSON.parse(res);
    });
  if (response.status) {
    if (response.status === 400) {
      console.log(response.status);
      setError('Вы ввели не верный код.');
    } else if (response.status === 200) {
      setError(null);
    }
  }
  if (photoModel.$photo !== null) {
    photoModel.setCommentId(response.id);
  }

  //setError(null);
  return response;
});

sample({
  clock: $newComment,
  source: $newComment,
  fn: (source) => source,
  target: sendCommentFX,
});

forward({
  from: sendCommentFX,
  to: getCommentsFX,
});

const $sending = sendCommentFX.pending;

export const commentsModel = {
  $comments,
  getComments,
  setNewComment,
  $newComment,
  $sending,
  $sendCommentError,
  setError,
};
