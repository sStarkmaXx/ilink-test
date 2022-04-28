import {
  createEffect,
  createStore,
  createEvent,
  forward,
  sample,
} from 'effector';

type commentStatusType = 'onCheck';

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
  captchaValue: number;
};

const setNewComment = createEvent<newCommentType>();

const $newComment = createStore<newCommentType>({
  authorName: '',
  text: '',
  title: 'Test Review',
  captchaKey: '',
  captchaValue: 0,
});

const newComment = $newComment.getState();

$newComment.on(setNewComment, (_, comment) => comment);

let body =
  'authorName=' +
  newComment.authorName +
  '&title=' +
  newComment.title +
  '&text=' +
  newComment.text +
  '&captchaKey=' +
  newComment.captchaKey +
  '&captchaValue=' +
  newComment.captchaValue;

const sendCommentFX = createEffect(async () => {
  const url = 'https://academtest.ilink.dev/reviews/create';
  console.log(newComment);
  debugger;
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
  return response;
});

sample({
  clock: $newComment,
  fn: (clock) => clock,
  target: sendCommentFX,
});

export const commentsModel = {
  $comments,
  getComments,
  setNewComment,
  $newComment,
};
