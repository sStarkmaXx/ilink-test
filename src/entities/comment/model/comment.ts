import { photoModel } from 'entities/photo/model/photo';
import { modalWindowMadel } from 'entities/modalWindow/model/modalWindowModel';
import { toastModel } from 'shared/ui/toast/model/toastModel';
import { commentApi } from '../api/commentApi';
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

//-------------------------------------получаем все комменты----------------------------------
const getCommentsFX = createEffect(() => {
  const response = commentApi
    .getAllComments()
    .then((res) => {
      if (res.status === 401) {
        document.location = '/ilink-test/';
      }
      return res.text();
    })
    .then((res) => JSON.parse(res));
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
  const response = await commentApi
    .sendNewComment(comment)
    .then((res) => res.text())
    .then((res) => {
      console.log(res);
      return JSON.parse(res);
    });

  if (response.status === 'onCheck') {
    if (photoModel.$photo.getState() !== null) {
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

const sendEditedCommentFX = createEffect((text: string) => {
  const id = $selectComment.getState().id;
  const response = commentApi
    .updateComment(id, text)
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
      return res.text();
    })
    .then((res) => {
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

const setCommentStatusFX = createEffect((status: commentStatusType) => {
  const id = $selectComment.getState().id;
  const response = commentApi
    .changeCommentStatus(id, status)
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
