import { commentType } from "../carousel/Carousel";
import css from "./CommentCard.module.css";

type commentCardType = {
  comment: commentType;
};

export const CommentCard: React.FC<commentCardType> = ({ comment }) => {
  return (
    <div className={css.commentCard}>
      <div className={css.cardHeader}>
        <div className={css.accountGroup}>
          <div className={css.avatar}></div>
          <div className={css.accountName}>{comment.name}</div>
        </div>
        <div className={css.date}>08.01.2022</div>
      </div>
      <div className={css.commentText}>{comment.text}</div>
    </div>
  );
};
