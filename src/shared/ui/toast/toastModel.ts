import { createEvent, createStore, forward, sample } from 'effector';

const $toast = createStore<null | string>(null);

const showHideToast = createEvent<null | string>();

const $toastError = createStore<boolean>(false);

const setToastError = createEvent<boolean>();

// forward({
//   from: showHideToast,
//   to: $toast,
// });

sample({
  clock: showHideToast,

  fn: (clock) => clock,
  target: $toast,
});

sample({
  clock: setToastError,
  fn: (clock) => clock,
  target: $toastError,
});

export const toastModel = {
  $toast,
  showHideToast,
  $toastError,
  setToastError,
};
