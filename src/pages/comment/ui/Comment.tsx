import { EditCommentsPage } from 'pages/editCommentsPage';
import { NavLink, Route, Routes } from 'react-router-dom';
import {
  commentType,
  commentStatusType,
  commentIdStatusType,
} from 'entities/comment/model/comment';
import css from './Comment.module.scss';
import ava from './img/avatar.png';
import { changeCommentStatus } from 'features/changeCommentStatus';

type CommentPropsType = {
  comment: commentType;
};

export const Comment: React.FC<CommentPropsType> = ({ comment }) => {
  let dataStyle = '';

  if (comment.status === 'approved') {
    dataStyle = 'admitted';
  }
  if (comment.status === 'declined') {
    dataStyle = 'rejected';
  }

  const photo = ' https://academtest.ilink.dev/images/' + comment.authorImage;

  const setCommentStatus = (filter: commentStatusType) => {
    const changeComment: commentIdStatusType = {
      id: comment.id,
      status: filter,
    };
    changeCommentStatus(changeComment);
  };

  return (
    <div className={css.comment} data-style={dataStyle}>
      <div className={css.header}>
        <div className={css.accountGroup}>
          <img
            className={css.photo}
            src={comment.authorImage ? photo : ava}
            alt=""
          />
          <span>{comment.authorName}</span>
        </div>
        <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
      </div>
      <div className={css.commentText}>{comment.text}</div>
      <div className={css.footer} data-style={dataStyle}>
        {comment.status === 'onCheck' && (
          <>
            <div className={css.buttons}>
              <button onClick={() => setCommentStatus('approved')}>
                Опубликовать
              </button>
              <button onClick={() => setCommentStatus('declined')}>
                Отклонить
              </button>
            </div>
            <NavLink to={`${comment.id}/editComment`}></NavLink>
          </>
        )}
        {comment.status !== 'onCheck' && (
          <>
            <div className={css.check} data-style={dataStyle}></div>
            <span>
              {comment.status === 'approved'
                ? 'Отзыв опубликован'
                : 'Отзыв отклонен'}
            </span>
          </>
        )}
      </div>
      <Routes>
        <Route path={':id/editComment'} element={<EditCommentsPage />}></Route>
      </Routes>
    </div>
  );
};
