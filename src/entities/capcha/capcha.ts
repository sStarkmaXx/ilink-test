import {
  createStore,
  createEffect,
  createEvent,
  forward,
  sample,
} from 'effector';

type capchaType = {
  base64Image: string;
  key: string;
};

const $capcha = createStore<capchaType>({
  base64Image: '',
  key: '',
});

const getCapchaFX = createEffect(async () => {
  const url = 'https://academtest.ilink.dev/reviews/getCaptcha';
  const response = await fetch(url, {
    method: 'GET',
  })
    .then((res) => res.text())
    .then((res) => JSON.parse(res));
  console.log(response);
  return response;
});

const getCapcha = createEvent();

forward({
  from: getCapcha,
  to: getCapchaFX,
});

sample({
  clock: getCapchaFX.doneData,
  fn: (clock) => clock,
  target: $capcha,
});

const $isLoading = getCapchaFX.pending;

export const capchaModel = {
  $capcha,
  getCapcha,
  $isLoading,
};
