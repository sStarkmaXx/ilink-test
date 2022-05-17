import { modalWindowMadel } from '../modalWindow/model/modalWindowModel';
import { toastModel } from '../../shared/ui/toast/model/toastModel';
import { commentsModel } from '../comment/model/comment';
import { accountModel } from '../account/model/accountModel';
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
const $sendPhotoError = createStore<string | null>(null);
const setSendPhotoError = createEvent<string | null>();
sample({
  clock: setSendPhotoError,
  source: setSendPhotoError,
  fn: (source) => source,
  target: $sendPhotoError,
});

const sendPhotoFX = createEffect(async (comID: string) => {
  const url = `https://academtest.ilink.dev/reviews/updatePhoto/${comID}`;
  const formData = new FormData();
  const photo = $photo.getState();
  if (photo) {
    formData.append('authorImage', photo);
  }
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      if (res.status === 401) {
        document.location = '/ilink-test/';
      }
      if (res.status >= 200 && res.status < 300) {
        modalWindowMadel.showHideModal(false);
        commentsModel.getComments();
        toastModel.setToastError(false);
        toastModel.showHideToast('Спасибо за отзыв о нашей компании!');
        setTimeout(() => toastModel.showHideToast(null), 2000);
      }
      if (res.status >= 300 && res.status < 500) {
        toastModel.showHideToast('Ошибка отправки фотографии!!');
        setTimeout(() => toastModel.showHideToast(null), 2000);
        toastModel.setToastError(true);
      }
      return res.text();
    })
    .then((res) => {
      JSON.parse(res);
      //console.log('ответ по картинке=', res);
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

const accessToken = localStorage.getItem('accessToken');
const token = 'Bearer' + ' ' + accessToken;
const updateProfilePhotoFX = createEffect(async () => {
  const url = 'https://academtest.ilink.dev/user/updatePhoto';
  const formData = new FormData();
  const photo = $photo.getState();
  if (photo) {
    formData.append('profileImage', photo);
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: `${token}`,
    },
    body: formData,
  })
    .then((res) => {
      if (res.status === 401) {
        document.location = '/ilink-test/';
      }
      if (res.status >= 200 && res.status < 300) {
        toastModel.setToastError(false);
        toastModel.showHideToast('Фотография успешно обновлена!');
        setTimeout(() => toastModel.showHideToast(null), 2000);
      }
      if (res.status >= 300 && res.status < 500) {
        toastModel.showHideToast('Ошибка, попробуйте позже!');
        setTimeout(() => toastModel.showHideToast(null), 2000);
        toastModel.setToastError(true);
      }
      return res.text();
    })
    .then((res) => JSON.parse(res));

  console.log('обнова фотки', response);
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
