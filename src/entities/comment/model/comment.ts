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

const sendCommentFX = createEffect(async (comment: newCommentType) => {
  const response = await commentApi
    .sendNewComment(comment)
    .then((res) => res.text())
    .then((res) => {
      return JSON.parse(res);
    });

  if (response.status === 'onCheck') {
    if (photoModel.$photo.getState() !== null) {
      photoModel.setCommentId(response.id);
    } else {
      modalWindowMadel.showHideModal(false);
      toastModel.success('Спасибо за отзыв о нашей компании!');
    }
  } else if (response.status === 400) {
    toastModel.error('Вы ввели не верный код.');
  } else {
    toastModel.error('Ошибка отправки комментария, попробуйте позже');
  }
  return response;
});

const sendNewComment = createEvent<newCommentType>();

sample({
  clock: sendNewComment,
  fn: (clock) => clock,
  target: sendCommentFX,
});

forward({
  from: sendCommentFX.doneData,
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
        toastModel.success('Отзыв успешно отредактирован!');
      }
      if (res.status >= 300 && res.status < 500) {
        toastModel.error('Ошибка, попробуйте позже!');
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
        toastModel.success('Статус отыва успешно изменен!');
      }
      if (res.status >= 300 && res.status < 500) {
        toastModel.error('Ошибка, попробуйте позже!');
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

export const commentModel = {
  $comments,
  getComments,
  $sending,
  $loadingComments,
  setSelectComment,
  $selectComment,
  setNewCommentText,
  setCommentStatus,
  $updatingComment,
  sendNewComment,
};
