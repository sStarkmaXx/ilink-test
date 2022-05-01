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
    .then((res) => res.text())
    .then((res) =>
      console.log('ответ по картинке=', res, 'body=', formData, 'url=', url)
    )
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
