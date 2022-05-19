import { createEvent, createStore, sample } from 'effector';

const $toast = createStore<null | string>(null);

const showHideToast = createEvent<null | string>();

const $toastError = createStore<boolean>(false);

const setToastError = createEvent<boolean>();

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

const error = (text: string) => {
  setToastError(true);
  showHideToast(text);
  setTimeout(() => showHideToast(null), 2000);
};

const success = (text: string) => {
  setToastError(false);
  showHideToast(text);
  setTimeout(() => showHideToast(null), 2000);
};

export const toastModel = {
  $toast,
  showHideToast,
  $toastError,
  error,
  success,
};
