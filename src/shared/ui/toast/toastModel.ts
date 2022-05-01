import { createEvent, createStore, forward, sample } from 'effector';

const $toast = createStore<boolean>(false);
const showHideToast = createEvent<boolean>();

forward({
  from: showHideToast,
  to: $toast,
});

sample({
  clock: showHideToast,
  source: showHideToast,
  fn: (source) => source,
  target: $toast,
});

export const toastModel = {
  $toast,
  showHideToast,
};
