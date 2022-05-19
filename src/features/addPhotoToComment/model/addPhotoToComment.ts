import { createEvent, sample } from 'effector';
import { photoModel } from 'entities/photo/model/photo';

export const addPhotoToComment = createEvent<File | null>();

sample({
  clock: addPhotoToComment,
  fn: (clock) => clock,
  target: photoModel.setPhoto,
});
