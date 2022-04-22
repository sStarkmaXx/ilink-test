import { EditCommentsPage } from 'pages/editCommentsPage/EditCommentsPage';
import { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Toast } from 'shared/ui/toast/Toast';
import css from './Comment.module.scss';

export type CommentStatusType = 'Допущен' | 'Отклонен' | 'На проверке';

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
  changeCommentStatus: (id: string, status: CommentStatusType) => void;
  changeCommentText: (newText: string) => void;
  selecter: (id: string) => void;
  selectCom?: CommentType;
};

export const Comment: React.FC<CommentPropsType> = ({
  comment,
  changeCommentStatus,
  changeCommentText,
  selecter,
  selectCom,
}) => {
  let dataStyle = '';

  if (comment.status === 'Допущен') {
    dataStyle = 'admitted';
  }
  if (comment.status === 'Отклонен') {
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
              <button
                onClick={() => changeCommentStatus(comment.id, 'Допущен')}
              >
                Опубликовать
              </button>
              <button
                onClick={() => changeCommentStatus(comment.id, 'Отклонен')}
              >
                Отклонить
              </button>
            </div>
            <NavLink
              to={`${comment.id}/editComment`}
              onClick={() => selecter(comment.id)}
            ></NavLink>
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
      <Routes>
        <Route
          path={':id/editComment'}
          element={
            <EditCommentsPage
              comment={selectCom!}
              changeCommentText={changeCommentText}
              showToast={showToast}
            />
          }
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
