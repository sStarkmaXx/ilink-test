import css from './CommentForm.module.css';
import close from './img/close.png';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { Toast } from 'shared/ui/toast/Toast';
import { useDispatch } from 'react-redux';
import { addCommentAC } from '../../store/commentsReducer';

type commentFormPropsType = {
  closeForm: () => void;
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
  showToast,
}) => {
  const dispatch = useDispatch();

  const addComment = (name: string, text: string) => {
    dispatch(addCommentAC(name, text));
  };

  const [inputName, setInputName] = useState<string>('');
  const onChangeHandlerInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };
  const [inputComment, setInputComment] = useState<string>('');
  const onChangeHandlerInputComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputComment(e.target.value);
  };

  const [error, setError] = useState<errorType>(null);
  const [errorText, setErrorText] = useState<string>('');

  const addCommentBtn = () => {
    if (inputName.trim() === '') {
      setError('nameIsEmpty');
      setErrorText('Заполните поле с именем.');
    } else if (inputName.length < 3) {
      setError('nameIsShort');
      setErrorText('Имя не должно быть короче трех букв');
    } else if (inputComment.trim() === '') {
      setError('commentIsEmpty');
      setErrorText('Заполните поле с комментарием.');
    } else if (inputComment.length < 30) {
      setError('commentIsShort');
      setErrorText('Ваш комментарий не должен быть короче 30 символов');
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

  const closeToast = () => {
    setError(null);
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
          <button className={css.addCommentBtnActive} onClick={addCommentBtn}>
            Отправить отзыв
          </button>
          <div className={css.textFooter}>
            Все отзывы проходят модерацию в течение 2 часов
          </div>
        </div>
      </div>
      {error && (
        <Toast closeToast={closeToast} error={error} text={errorText} />
      )}
    </div>
  );
};
