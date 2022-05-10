import { photoModel } from '../photo/photo';
import { modalWindowMadel } from '../modalWindow/modalWindowModel';
import { toastModel } from '../../shared/ui/toast/toastModel';
import {
  createEffect,
  createStore,
  createEvent,
  forward,
  sample,
} from 'effector';

export type commentStatusType = 'onCheck' | 'approved' | 'declined';

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
    .then((res) => {
      if (res.status === 401) {
        document.location = '/ilink-test/';
      }
      return res.text();
    })
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

  if (response.status === 'onCheck') {
    if (photoModel.$photo.getState() !== null) {
      debugger;
      photoModel.setCommentId(response.id);
    } else {
      modalWindowMadel.showHideModal(false);
      toastModel.showHideToast('Спасибо за отзыв о нашей компании!');
      setTimeout(() => toastModel.showHideToast(null), 2000);
      setError(null);
    }
  } else if (response.status === 400) {
    setError('Вы ввели не верный код.');
    setTimeout(() => setError(null), 2000);
    console.log('ошибка 400');
  } else {
    setError('Ошибка отправки комментария, попробуйте позже!');
    setTimeout(() => setError(null), 2000);
  }
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
const $loadingComments = getCommentsFX.pending;

//--------------------------------------редактирование коммента--------------------------------------

const $selectComment = createStore<commentType>({
  authorImage: '',
  authorName: '',
  createdAt: '',
  deletedAt: null,
  id: '',
  status: 'onCheck',
  text: '',
  title: 'Test Review',
  updatedAt: '',
  version: 1,
});

const setSelectComment = createEvent<string>();

sample({
  clock: setSelectComment,
  source: $comments,
  fn: (source, clock) => {
    const selectCom = source.find((com) => com.id === clock);
    return selectCom!;
  },
  target: $selectComment,
});

const sendEditedCommentFX = createEffect(async (text: string) => {
  const id = $selectComment.getState().id;

  const url = `https://academtest.ilink.dev/reviews/updateInfo/${id}`;
  const body = 'text=' + text;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      authorization: `${token}`,
    },
    body: body,
  })
    .then((res) => {
      if (res.status === 401) {
        document.location = '/ilink-test/';
      }
      if (res.status >= 200 && res.status < 300) {
        toastModel.setToastError(false);
        toastModel.showHideToast('Отзыв успешно отредактирован!');
        setTimeout(() => toastModel.showHideToast(null), 2000);
      }
      if (res.status >= 300 && res.status < 500) {
        toastModel.showHideToast('Ошибка, попробуйте позже!');
        setTimeout(() => toastModel.showHideToast(null), 2000);
        toastModel.setToastError(true);
      }
      console.log('редактирование отзыва', res);
      return res.text();
    })
    .then((res) => {
      //console.log('редактирование отзыва', res);
      return JSON.parse(res);
    });

  return response;
});

const setNewCommentText = createEvent<string>();

sample({
  clock: setNewCommentText,
  fn: (clock) => clock,
  target: sendEditedCommentFX,
});

forward({
  from: sendEditedCommentFX.doneData,
  to: getCommentsFX,
});
const $updatingComment = sendEditedCommentFX.pending;
//-----------------------------------------------------------отклонение, подтверждение отзыва---------------------------------

const setCommentStatusFX = createEffect(async (status: commentStatusType) => {
  const id = $selectComment.getState().id;
  const url = `https://academtest.ilink.dev/reviews/updateStatus/${id}`;
  const body = 'status=' + status;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      authorization: `${token}`,
    },
    body: body,
  })
    .then((res) => {
      if (res.status === 401) {
        document.location = '/ilink-test/';
      }
      if (res.status >= 200 && res.status < 300) {
        toastModel.setToastError(false);
        toastModel.showHideToast('Статус отыва успешно изменен!');
        setTimeout(() => toastModel.showHideToast(null), 2000);
      }
      if (res.status >= 300 && res.status < 500) {
        toastModel.showHideToast('Ошибка, попробуйте позже!');
        setTimeout(() => toastModel.showHideToast(null), 2000);
        toastModel.setToastError(true);
      }

      return res.text();
    })
    .then((res) => {
      console.log('смена статуса отзыва', JSON.parse(res));
      return JSON.parse(res);
    });
  return response;
});

const setCommentStatus = createEvent<commentStatusType>();

forward({
  from: setCommentStatus,
  to: setCommentStatusFX,
});

sample({
  clock: setCommentStatus,
  fn: (clock) => clock,
  target: setCommentStatusFX,
});
forward({
  from: setCommentStatusFX.doneData,
  to: getCommentsFX,
});

export const commentsModel = {
  $comments,
  getComments,
  setNewComment,
  $newComment,
  $sending,
  $sendCommentError,
  setError,
  $loadingComments,
  setSelectComment,
  $selectComment,
  setNewCommentText,
  setCommentStatus,
  $updatingComment,
};
