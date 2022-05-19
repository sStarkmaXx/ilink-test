import { createEvent, sample } from 'effector';
import { commentModel } from '../../../entities/comment/model/comment';

export const sendEditComment = createEvent<string>();

sample({
  clock: sendEditComment,
  fn: (clock) => clock,
  target: commentModel.setNewCommentText,
});
