import { createEvent, sample } from 'effector';
import {
  accountModel,
  newProfileInfoType,
} from 'entities/account/model/accountModel';

export const sendEditProfileInfo = createEvent<newProfileInfoType>();

sample({
  clock: sendEditProfileInfo,
  fn: (clock) => clock,
  target: accountModel.updateProfileInfo,
});
