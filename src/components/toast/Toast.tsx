import css from './Toast.module.css';
import union from './img/union.png';
import check from './img/check.png';
import close from './img/close.png';

type toastPropsType = {
  closeToast: () => void;
};

export const Toast: React.FC<toastPropsType> = ({ closeToast }) => {
  return (
    <div className={css.toast} style={{ backgroundImage: `url(${union})` }}>
      <div className={css.header}>
        <div className={css.text}>Успешно!</div>
        <img
          src={close}
          alt=""
          style={{ width: '15px', height: '15px' }}
          onClick={closeToast}
        />
      </div>
      <div className={css.body}>Спасибо за отзыв о нашей компании!</div>
      <div
        className={css.bubble}
        style={{ backgroundImage: `url(${check})` }}
      ></div>
    </div>
  );
};
