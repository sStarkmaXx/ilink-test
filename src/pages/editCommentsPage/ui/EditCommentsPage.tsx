import css from './EditCommentsPage.module.scss';
import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from 'effector-react';
import { commentsModel } from 'entities/comment/model/comment';
import { Toast, toastModel } from 'shared/ui/toast';
import { Preloader } from 'shared/ui/preloader';

export const EditCommentsPage = () => {
  const isLoading = useStore(commentsModel.$updatingComment);
  const selectComment = useStore(commentsModel.$selectComment);
  const [text, setText] = useState<string>(selectComment.text);
  const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const disabled = text.trim() === '';
  const onClickChangeComText = () => {
    if (!disabled) {
      commentsModel.setNewCommentText(text);
    }
  };

  const toast = useStore(toastModel.$toast);
  const toastError = useStore(toastModel.$toastError);
  const closeToast = () => {
    toastModel.showHideToast(null);
  };

  return (
    <div className={css.layer}>
      <div className={css.editWindow}>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            {' '}
            <div className={css.header}>
              <p>Редактирование отзыва</p>
              <NavLink to={'/ilink-test/controlPanel/comments/'}></NavLink>
            </div>
            <label>Отзыв</label>
            <div className={css.length} data-length={`${text.length}/200`}>
              <textarea
                value={text}
                maxLength={200}
                onChange={changeText}
                style={disabled ? { border: 'red 1px solid' } : {}}
                placeholder={
                  disabled ? 'Полее обязательно для заполнения!' : ''
                }
              ></textarea>
            </div>
            <div className={css.footer}>
              <NavLink
                to={'/ilink-test/controlPanel/comments/'}
                onClick={onClickChangeComText}
                className={disabled ? css.disabled : ''}
              >
                Подтвердить редактирование
              </NavLink>
              <NavLink to={'/ilink-test/controlPanel/comments/'}>
                Отмена
              </NavLink>
            </div>
          </>
        )}
      </div>
      {toast && (
        <Toast closeToast={closeToast} error={toastError} text={toast} />
      )}
    </div>
  );
};
