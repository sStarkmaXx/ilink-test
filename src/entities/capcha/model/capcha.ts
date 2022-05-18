import { captchaApi } from '../api/captchaApi';
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

const getCapchaFX = createEffect(() => {
  const response = captchaApi
    .getCaptcha()
    .then((res) => res.text())
    .then((res) => JSON.parse(res));
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
