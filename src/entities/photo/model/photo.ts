import { modalWindowMadel } from '../../modalWindow/model/modalWindowModel';
import { toastModel } from '../../../shared/ui/toast/model/toastModel';
import { commentModel } from '../../comment/model/comment';
import { accountModel } from '../../account/model/accountModel';
import { photoApi } from '../api/photoApi';
import {
  createEvent,
  createStore,
  createEffect,
  forward,
  sample,
} from 'effector';

const $photo = createStore<File | null>(null);
const $commentId = createStore<string>('');
const setPhoto = createEvent<File | null>();
const setCommentId = createEvent<string>();

const sendPhotoFX = createEffect((comID: string) => {
  const body = new FormData();
  const photo = $photo.getState();
  if (photo) {
    body.append('authorImage', photo);
  }
  const response = photoApi
    .sendPhoto(comID, body)
    .then((res) => {
      if (res.status === 401) {
        document.location = '/ilink-test/';
      }
      if (res.status >= 200 && res.status < 300) {
        modalWindowMadel.showHideModal(false);
        commentModel.getComments();
        toastModel.success('Спасибо за отзыв о нашей компании!');
      }
      if (res.status >= 300 && res.status < 500) {
        toastModel.error('Ошибка отправки фотографии!');
      }
      return res.text();
    })
    .then((res) => {
      JSON.parse(res);
    })
    .catch((err) => console.log('error!', err));
  return response;
});
//-------------------------------------------------getphoto---------------------------------------
forward({
  from: setPhoto,
  to: $photo,
});

sample({
  clock: setPhoto,
  source: setPhoto,
  fn: (source) => source,
  target: $photo,
});
//----------------------------------------sendPhoto--------------------------------------
forward({
  from: $commentId,
  to: sendPhotoFX,
});
sample({
  clock: $commentId,
  source: $commentId,
  fn: (source) => source,
  target: sendPhotoFX,
});

//---------------------------------------------commentID--------------------------------------------
forward({
  from: setCommentId,
  to: $commentId,
});

sample({
  clock: setCommentId,
  source: setCommentId,
  fn: (source) => source,
  target: $commentId,
});

//----------------------------------------newPhotoForProfile--------------------------------------------

const updateProfilePhotoFX = createEffect(() => {
  const body = new FormData();
  const photo = $photo.getState();
  if (photo) {
    body.append('profileImage', photo);
  }
  const response = photoApi
    .updateProfilePhoto(body)
    .then((res) => {
      if (res.status === 401) {
        document.location = '/ilink-test/';
      }
      if (res.status >= 200 && res.status < 300) {
        toastModel.success('Фотография успешно обновлена!');
      }
      if (res.status >= 300 && res.status < 500) {
        toastModel.error('Ошибка, попробуйте позже!');
      }
      return res.text();
    })
    .then((res) => JSON.parse(res));
  return response;
});

const updateProfilePhoto = createEvent();

forward({
  from: updateProfilePhoto,
  to: updateProfilePhotoFX,
});

forward({
  from: updateProfilePhotoFX.doneData,
  to: accountModel.getAccount,
});

export const photoModel = {
  $photo,
  setPhoto,
  sendPhotoFX,
  setCommentId,
  updateProfilePhoto,
};
