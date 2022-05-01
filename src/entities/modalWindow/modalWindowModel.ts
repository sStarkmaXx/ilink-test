import { createEvent, createStore, forward, sample } from 'effector';

const $modalWindow = createStore<boolean>(false);
const showHideModal = createEvent<boolean>();

forward({
  from: showHideModal,
  to: $modalWindow,
});

sample({
  clock: showHideModal,
  source: showHideModal,
  fn: (source) => source,
  target: $modalWindow,
});

export const modalWindowMadel = {
  $modalWindow,
  showHideModal,
};
