import { modalWindowMadel } from './../modalWindow/modalWindowModel';
import { toastModel } from '../../shared/ui/toast/toastModel';
import { commentsModel } from '../comments/comments';
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
      if (res.status >= 300) {
        setSendPhotoError('Ошибка отправки картинки!');
      } else {
        modalWindowMadel.showHideModal(false);
        toastModel.showHideToast(true);
        commentsModel.getComments();
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

export const photoModel = {
  $photo,
  setPhoto,
  sendPhotoFX,
  setCommentId,
};
