import { createEvent, sample } from 'effector';
import { photoModel } from '../../../entities/photo/model/photo';

export const updateProfilePhoto = createEvent();

sample({
  clock: updateProfilePhoto,
  fn: (clock) => clock,
  target: photoModel.updateProfilePhoto,
});
