import { createEvent, sample } from 'effector';
import {
  commentIdStatusType,
  commentModel,
} from 'entities/comment/model/comment';

export const changeCommentStatus = createEvent<commentIdStatusType>();

sample({
  clock: changeCommentStatus,
  fn: (clock) => clock,
  target: commentModel.setCommentStatus,
});
