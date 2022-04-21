import { CommentType } from 'entities/comments/ui/Comment';
import css from './EditCommentsPage.module.scss';
import { ChangeEvent, useState } from 'react';
import { NavLink } from 'react-router-dom';

type EditCommentsPagePropsType = {
  comment: CommentType;
  changeCommentText: (newText: string) => void;
};

export const EditCommentsPage: React.FC<EditCommentsPagePropsType> = ({
  comment,
  changeCommentText,
}) => {
  const [text, setText] = useState<string>(comment.commentText);
  const changeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  const onClickChangeComText = () => {
    changeCommentText(text);
  };

  return (
    <div className={css.layer}>
      <div className={css.editWindow}>
        <div className={css.header}>
          <p>Редактирование отзыва</p>
          <button></button>
        </div>
        <label>Отзыв</label>
        <div className={css.length} data-length={`${text.length}/200`}>
          <textarea
            value={text}
            maxLength={200}
            onChange={changeText}
          ></textarea>
        </div>
        <div className={css.footer}>
          <NavLink
            to={'/ilink-test/controlPanel/comments/'}
            onClick={onClickChangeComText}
          >
            Подтвердить редактирование
          </NavLink>
          <NavLink to={'/ilink-test/controlPanel/comments/'}>Отмена</NavLink>
        </div>
      </div>
    </div>
  );
};
