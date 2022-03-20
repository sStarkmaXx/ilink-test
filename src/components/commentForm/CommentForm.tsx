import css from './CommentForm.module.css';
import close from './img/close.png';
import { ChangeEvent, useState, KeyboardEvent } from 'react';

type commentFormPropsType = {
  closeForm: () => void;
  addComment: (name: string, text: string) => void;
  showToast: () => void;
};

type errorType =
  | 'nameIsEmpty'
  | 'commentIsEmpty'
  | 'nameIsShort'
  | 'commentIsShort'
  | null;

export const CommentForm: React.FC<commentFormPropsType> = ({
  closeForm,
  addComment,
  showToast,
}) => {
  const [inputName, setInputName] = useState<string>('');
  const onChangeHandlerInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };
  const [inputComment, setInputComment] = useState<string>('');
  const onChangeHandlerInputComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputComment(e.target.value);
  };

  const [error, setError] = useState<errorType>(null);

  const addCommentBtn = () => {
    if (inputName.trim() == '') {
      setError('nameIsEmpty');
    } else if (inputName.length < 3) {
      setError('nameIsShort');
    } else if (inputComment.trim() == '') {
      setError('commentIsEmpty');
    } else if (inputComment.length < 30) {
      setError('commentIsShort');
    } else {
      addComment(inputName, inputComment);
      closeForm();
      showToast();
    }
  };

  const onKeyPressHandler = (
    e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    setError(null);
    if (e.charCode === 13) {
      addCommentBtn();
    }
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
            style={error === 'nameIsEmpty' ? { border: '1px solid red' } : {}}
            placeholder="Имя Фамилия"
            onChange={onChangeHandlerInputName}
            onKeyPress={onKeyPressHandler}
          />
          <button className={css.addPhotoBtn}>+ Загрузить фото</button>
        </div>
        <div className={css.label}>Все ли вам понравилос?</div>

        <textarea
          className={css.commentText}
          style={error === 'commentIsEmpty' ? { border: '1px solid red' } : {}}
          value={inputComment}
          maxLength={200}
          placeholder="Напишите пару слов о вашем опыте..."
          onChange={onChangeHandlerInputComment}
          onKeyPress={onKeyPressHandler}
        ></textarea>
        <div className={css.footer}>
          <button
            className={css.addCommentBtnActive}
            onClick={addCommentBtn}
            //disabled={!inputName || !inputComment}
          >
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
