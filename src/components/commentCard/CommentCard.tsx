import { commentType } from '../../store/commentsReducer';
import css from './CommentCard.module.css';
import ava from './img/Path.png';

type commentCardType = {
  comment: commentType;
};

export const CommentCard: React.FC<commentCardType> = ({ comment }) => {
  return (
    <div className={css.commentCard}>
      <div className={css.cardHeader}>
        <div className={css.accountGroup}>
          <div
            className={css.avatar}
            style={{ backgroundImage: `url(${ava})` }}
          ></div>
          <div className={css.accountName}>{comment.name}</div>
        </div>
        <div className={css.date}>{comment.date}</div>
      </div>
      <div className={css.commentText}>{comment.text}</div>
    </div>
  );
};
