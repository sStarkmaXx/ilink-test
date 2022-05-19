import css from './CommentForm.module.scss';
import close from '../img/close.png';
import { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import { useStore } from 'effector-react';
import { capchaModel } from 'entities/capcha/model/capcha';
import { newCommentType } from 'entities/comment/model/comment';
import { commentModel } from 'entities/comment/model/comment';
import { Preloader } from 'shared/ui/preloader';
import fileImg from '../img/animation_500_l123b4fc 1.png';
import del from '../img/Delete.png';
import { modalWindowMadel } from 'entities/modalWindow/model/modalWindowModel';
import { addNewComment } from 'features/addComment';
import { addPhotoToComment } from 'features/addPhotoToComment';
import { nameInCommentForm } from 'shared/regexp/nameInCommentForm';

export const CommentForm = () => {
  useEffect(() => capchaModel.getCapcha(), []);
  const closeModal = () => {
    modalWindowMadel.showHideModal(false);
  };
  //-------------------------------------------field name----------------------------------------------
  const [nameError, setNameError] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>('');
  const onChangeHandlerInputName = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (nameInCommentForm.test(value) || value === '') {
      setInputName(e.target.value);
      setNameError(false);
    }
    if (value.trim() === '') {
      setNameError(true);
    }
  };

  const onBlureName = () => {
    if (inputName.trim() === '') {
      setNameError(true);
    }
  };

  //------------------------------------------field comment----------------------------------------------------

  const [inputComment, setInputComment] = useState<string>('');
  const onChangeHandlerInputComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputComment(e.target.value);
    setInputCommentError(false);
  };

  const [inputCommentError, setInputCommentError] = useState<boolean>(false);
  const onBlurComment = () => {
    if (inputComment.trim() === '') {
      setInputCommentError(true);
    }
  };

  //--------------------------------CAPCHA----------------------------------
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

  const onBlurCapcha = () => {
    if (capchaInput.trim() === '') {
      setCapchaError(true);
    }
  };

  const regexCapchaInput = /^\d+$/;

  const capcha = useStore(capchaModel.$capcha);
  const onClickGetCapcha = () => {
    capchaModel.getCapcha();
  };
  const capchaIsLoading = useStore(capchaModel.$isLoading);
  //---------------------------------загркзка картинки--------------------------
  const [fileSize, setFileSize] = useState<number>(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const delFile = () => {
    addPhotoToComment(null);
    setFileName(null);
  };

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
        addPhotoToComment(file);
      }
      e.target.value = '';
    }
  };

  const fileError = fileSize > 5242880;
  //-----------------------------Новый коммент---------------------------------
  const addNewCommentOnBtnClick = () => {
    const newComment: newCommentType = {
      authorName: inputName,
      text: inputComment,
      title: 'Test Review',
      captchaKey: capcha.key,
      captchaValue: capchaInput,
    };
    addNewComment(newComment);
  };

  const addNewCommentOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isAddCommentBtnActive) {
      if (e.code === 'Enter') {
        addNewCommentOnBtnClick();
      }
    }
  };

  const sending = useStore(commentModel.$sending);
  //-----------------------------------------------------------------------------------------------------
  const isAddCommentBtnActive =
    inputCommentError ||
    nameError ||
    capchaError ||
    inputName.trim() === '' ||
    inputComment.trim() === '' ||
    capchaInput.trim() === '';

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
                onClick={closeModal}
              />
            </div>
            <div className={css.label}>Как вас зовут?</div>
            <div className={css.fileLoader}>
              <input
                type="text"
                value={inputName}
                className={css.nameInput}
                style={nameError ? { border: '1px solid red' } : {}}
                placeholder={
                  nameError ? 'Поле обязательно для заполнения' : 'Имя'
                }
                onChange={onChangeHandlerInputName}
                onBlur={onBlureName}
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
              style={inputCommentError ? { border: '1px solid red' } : {}}
              value={inputComment}
              maxLength={200}
              placeholder={
                inputCommentError
                  ? 'Пожалуйста напишите Ваш отзыв'
                  : 'Напишите пару слов о вашем опыте...'
              }
              onChange={onChangeHandlerInputComment}
              onBlur={onBlurComment}
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
                  onBlur={onBlurCapcha}
                  onKeyDown={addNewCommentOnKeyDown}
                />
              </div>
            </div>

            <div className={css.footer}>
              <button
                className={
                  isAddCommentBtnActive
                    ? css.addCommentBtnDis
                    : css.addCommentBtnActive
                }
                onClick={addNewCommentOnBtnClick}
                disabled={isAddCommentBtnActive}
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
    </div>
  );
};
