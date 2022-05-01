import css from './CommentForm.module.scss';
import close from './img/close.png';
import { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import { Toast } from 'shared/ui/toast/Toast';
import { useStore } from 'effector-react';
import { capchaModel } from '../../entities/capcha/capcha';
import { newCommentType } from 'entities/comments/comments';
import { commentsModel } from '../../entities/comments/comments';
import { Preloader } from '../../shared/ui/preloader/Preloader';
import { photoModel } from '../../entities/photo/photo';
import fileImg from './img/animation_500_l123b4fc 1.png';
import del from './img/Delete.png';

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
  useEffect(() => capchaModel.getCapcha(), []);

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
      createNewComment();
      if (sendError !== null) {
        console.log('asdadas', sendError);
      } else {
        closeForm();
        showToast();
      }
    }
  };

  const onKeyPressHandler = (
    e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    setError(null);
    if (e.code === '13') {
      addCommentBtn();
    }
  };

  const closeToast = () => {
    setError(null);
    commentsModel.setError(null);
  };

  const [capchaInput, setCapchaInput] = useState<string>('');
  const [capchaError, setCapchaError] = useState<boolean>(false);
  const capchaInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (regexCapchaInput.test(value) || value === '') {
      setCapchaInput(value);
      setCapchaError(false);
    } else {
      setCapchaError(true);
    }
  };

  const regexCapchaInput = /^\d+$/;

  //--------------------------------CAPCHA----------------------------------
  const capcha = useStore(capchaModel.$capcha);
  const onClickGetCapcha = () => {
    capchaModel.getCapcha();
  };
  const capchaIsLoading = useStore(capchaModel.$isLoading);
  //---------------------------------загркзка картинки--------------------------
  const [fileSize, setFileSize] = useState<number>(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const delFile = () => {
    photoModel.setPhoto(null);
    setFileName(null);
  };
  const photo = useStore(photoModel.$photo);

  const onClickSelectImg = (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (file) {
      setFileSize(file.size);
      if (!fileError) {
        if (file.name.length > 20) {
          setFileName(
            file.name.substring(0, 9) +
              '...' +
              file.name.substring(file.name.length - 8)
          );
        } else {
          setFileName(file.name);
        }
        photoModel.setPhoto(file);
        console.log('file', file);
        console.log('photo', photo);
      }
    }
  };

  const fileError = fileSize > 5242880;
  //-----------------------------Новый коммент---------------------------------
  const createNewComment = () => {
    const newComment: newCommentType = {
      authorName: inputName,
      text: inputComment,
      title: 'Test Review',
      captchaKey: capcha.key,
      captchaValue: capchaInput,
    };
    commentsModel.setNewComment(newComment);
  };

  const sending = useStore(commentsModel.$sending);
  const sendError = useStore(commentsModel.$sendCommentError);

  return (
    <div className={css.cont}>
      <div className={css.commentForm}>
        {sending ? (
          <Preloader />
        ) : (
          <>
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
            <div className={css.fileLoader}>
              <input
                type="text"
                value={inputName}
                className={css.nameInput}
                style={
                  error === 'nameIsEmpty' ? { border: '1px solid red' } : {}
                }
                placeholder="Имя Фамилия"
                onChange={onChangeHandlerInputName}
                onKeyPress={onKeyPressHandler}
              />
              <label
                htmlFor="loadFile"
                data-size={
                  fileError ? 'Размер файла должен быть меньше 5мб' : ''
                }
                style={fileError ? { color: 'red' } : {}}
              >
                + Загрузить фото
              </label>
              <input
                type={'file'}
                accept={'.png, .jpeg, .jpg'}
                id="loadFile"
                style={{ display: 'none' }}
                onChange={onClickSelectImg}
              ></input>
            </div>
            {fileName && (
              <div className={css.fileLoad}>
                <img src={fileImg} alt="" />
                <p>{fileName}</p>
                <img src={del} alt="" onClick={delFile} />
              </div>
            )}
            <div className={css.label}>Все ли вам понравилос?</div>

            <textarea
              className={css.commentText}
              style={
                error === 'commentIsEmpty' ? { border: '1px solid red' } : {}
              }
              value={inputComment}
              maxLength={200}
              placeholder="Напишите пару слов о вашем опыте..."
              onChange={onChangeHandlerInputComment}
              onKeyPress={onKeyPressHandler}
            ></textarea>
            <div className={css.capchaGroup}>
              <div className={css.capcha}>
                <div className={css.load}>
                  {capchaIsLoading ? (
                    <Preloader />
                  ) : (
                    <img src={capcha.base64Image} alt="" />
                  )}
                </div>
                <button onClick={onClickGetCapcha}></button>
              </div>
              <div className={css.capchaIput}>
                <div className={css.label}>Введите код с картинки:</div>
                <input
                  type="text"
                  placeholder={
                    capchaError ? 'Введите цифры с картинки!' : '00000'
                  }
                  className={css.nameInput}
                  value={capchaInput}
                  onChange={capchaInputOnChange}
                  style={capchaError ? { border: '1px red solid' } : {}}
                />
              </div>
            </div>

            <div className={css.footer}>
              <button
                className={css.addCommentBtnActive}
                onClick={addCommentBtn}
              >
                Отправить отзыв
              </button>
              <div className={css.textFooter}>
                <img src="" alt="" />
                Все отзывы проходят модерацию в течение 2 часов
              </div>
            </div>
          </>
        )}
      </div>
      {error && (
        <Toast closeToast={closeToast} error={error} text={errorText} />
      )}
      {sendError && (
        <Toast closeToast={closeToast} error={sendError} text={sendError} />
      )}
    </div>
  );
};
