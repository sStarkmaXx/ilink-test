import { EditCommentsPage } from 'pages/editCommentsPage/EditCommentsPage';
import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Toast } from 'shared/ui/toast/Toast';
import { commentType, commentsModel, commentStatusType } from '../comments';
import css from './Comment.module.scss';
import ava from './img/avatar.png';

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
  const [toast, setToast] = useState<boolean>(false);
  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };
  const closeToast = () => {
    setToast(false);
  };
  const photo = ' https://academtest.ilink.dev/images/' + comment.authorImage;

  const selectCommentFN = () => {
    commentsModel.setSelectComment(comment.id);
  };

  const setCommentStatus = (filter: commentStatusType) => {
    selectCommentFN();
    commentsModel.setCommentStatus(filter);
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
            <NavLink
              to={`${comment.id}/editComment`}
              onClick={selectCommentFN}
            ></NavLink>
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
        <Route
          path={':id/editComment'}
          element={<EditCommentsPage showToast={showToast} />}
        ></Route>
      </Routes>
      {toast && (
        <Toast
          closeToast={closeToast}
          error={null}
          text={'Отзыв успешно отредактирован!'}
        />
      )}
    </div>
  );
};
