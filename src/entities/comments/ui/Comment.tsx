import { NavLink } from 'react-router-dom';
import css from './Comment.module.scss';

type CommentStatusType = 'Допущен' | 'Отклонен' | 'На проверке';

export type CommentType = {
  id: string;
  name: string;
  lastName: string;
  photo: string;
  commentText: string;
  status: CommentStatusType;
  time: string;
};

type CommentPropsType = {
  comment: CommentType;
};

export const Comment: React.FC<CommentPropsType> = ({ comment }) => {
  let dataStyle = '';

  if (comment.status === 'Допущен') {
    dataStyle = 'admitted';
  }
  if (comment.status === 'Отклонен') {
    dataStyle = 'rejected';
  }
  return (
    <div className={css.comment} data-style={dataStyle}>
      <div className={css.header}>
        <div className={css.accountGroup}>
          <div className={css.photo}>{comment.photo}</div>
          <span>
            {comment.name} {comment.lastName}
          </span>
        </div>
        <p>{comment.time}</p>
      </div>
      <div className={css.commentText}>{comment.commentText}</div>
      <div className={css.footer} data-style={dataStyle}>
        {comment.status === 'На проверке' && (
          <>
            <div className={css.buttons}>
              <button>Опубликовать</button>
              <button>Отклонить</button>
            </div>
            <NavLink to={''}></NavLink>
          </>
        )}
        {comment.status !== 'На проверке' && (
          <>
            <div className={css.check} data-style={dataStyle}></div>
            <span>
              {comment.status === 'Допущен'
                ? 'Отзыв опубликован'
                : 'Отзыв отклонен'}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
