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
  text: 'Work';
  title: 'Test Review';
  updatedAt: string;
  version: number;
};

const $comments = createStore<commentType[]>([]);

const accessToken = localStorage.getItem('accessToken');
const token = 'Bearer' + ' ' + accessToken;

const getCommentsFX = createEffect(async () => {
  const url = 'https://academtest.ilink.dev/reviews/getAll';
  const response = await fetch(url, {
    method: 'GET',
    headers: { authorization: `${token}` },
  })
    .then((res) => res.text())
    .then((res) => JSON.parse(res));
  console.log(response);
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

export const commentsModel = {
  $comments,
  getComments,
};
