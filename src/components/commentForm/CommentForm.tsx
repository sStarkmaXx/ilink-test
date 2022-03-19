import css from './CommentForm.module.css';
import close from './img/close.png';
import { ChangeEvent, useState } from 'react';

type commentFormPropsType = {
  closeForm: () => void;
  addComment: (name: string, text: string) => void;
};

export const CommentForm: React.FC<commentFormPropsType> = ({
  closeForm,
  addComment,
}) => {
  const [inputName, setInputName] = useState<string>('');
  const onChangeHandlerInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };
  const [inputComment, setInputComment] = useState<string>('');
  const onChangeHandlerInputComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputComment(e.target.value);
  };

  const addCommentBtn = () => {
    addComment(inputName, inputComment);
    closeForm();
  };

  return (
    <div className={css.cont}>
      <div className={css.commentForm}>
        <div className={css.header}>
          <div className={css.text}>Отзыв</div>
          <img
            src={close}
            style={{ width: '25px', height: '25px' }}
            alt=""
            onClick={closeForm}
          />
        </div>
        <div className={css.label}>Как вас зовут?</div>
        <div className={css.name_file}>
          <input
            type="text"
            value={inputName}
            className={css.nameInput}
            placeholder="Имя Фамилия"
            onChange={onChangeHandlerInputName}
            required
          />
          <button className={css.addPfotoBtn}>+ Загрузить фото</button>
        </div>
        <div className={css.label}>Все ли вам понравилос?</div>
        <textarea
          className={css.commentText}
          value={inputComment}
          maxLength={200}
          placeholder="Напишите пару слов о вашем опыте..."
          onChange={onChangeHandlerInputComment}
        ></textarea>
        <div className={css.footer}>
          <button className={css.addCommentBtn} onClick={addCommentBtn}>
            Отправить отзыв
          </button>
          <div className={css.textFooter}>
            Все отзывы проходят модерацию в течение 2 часов
          </div>
        </div>
      </div>
    </div>
  );
};
