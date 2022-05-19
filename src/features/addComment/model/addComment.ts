import { createEvent, sample } from 'effector';
import {
  commentModel,
  newCommentType,
} from '../../../entities/comment/model/comment';

export const addNewComment = createEvent<newCommentType>();

sample({
  clock: addNewComment,
  fn: (clock) => clock,
  target: commentModel.sendNewComment,
});
