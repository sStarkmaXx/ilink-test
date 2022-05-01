import { commentType } from 'entities/comments/comments';
import css from './CommentCard.module.css';
import ava from './img/avatar.png';

type commentCardType = {
  comment: commentType;
};

export const CommentCard: React.FC<commentCardType> = ({ comment }) => {
  //console.log(comment);
  const photo = ' https://academtest.ilink.dev/images/' + comment.authorImage;
  const isPhoto = comment.authorImage !== null;
  return (
    <div className={css.commentCard}>
      <div className={css.cardHeader}>
        <div className={css.accountGroup}>
          <img className={css.photo} src={isPhoto ? photo : ava} alt="" />
          <div className={css.accountName}>{comment.authorName}</div>
        </div>
        <div className={css.date}>
          {new Date(comment.createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className={css.commentText}>{comment.text}</div>
    </div>
  );
};
