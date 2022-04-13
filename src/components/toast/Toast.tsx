import css from './Toast.module.css';
import green from './img/green.png';
import check from './img/check.png';
import close from './img/close.png';
import imgError from './img/error.png';

type toastPropsType = {
  closeToast: () => void;
  error: string | null;
  text: string;
};

export const Toast: React.FC<toastPropsType> = ({
  closeToast,
  error,
  text,
}) => {
  return (
    <div
      className={error ? css.errorToast : css.toast}
      style={{ backgroundImage: `url(${error ? '' : green})` }}
    >
      <div className={css.header}>
        <div className={error ? css.errorText : css.text}>
          {error ? 'Что-то не так...' : 'Успешно!'}
        </div>
        <img
          src={close}
          alt=""
          style={{ width: '15px', height: '15px' }}
          onClick={closeToast}
        />
      </div>
      <div className={error ? css.errorBody : css.body}>{text}</div>
      <div
        className={error ? css.errorBubble : css.bubble}
        style={{ backgroundImage: `url(${error ? imgError : check})` }}
      ></div>
    </div>
  );
};
