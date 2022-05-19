import { createEvent, sample } from 'effector';
import {
  accessTokenModel,
  loginDataType,
} from 'entities/accessToken/model/accessToken';
export const login = createEvent<loginDataType>();
sample({
  clock: login,
  fn: (clock) => clock,
  target: accessTokenModel.getAccessToken,
});
