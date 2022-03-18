import css from './AccountInfo.module.css';
import myPhoto from './img/my_photo.jpg';

export const AccountInfo = () => {
  return (
    <div className={css.accountCont}>
      <div className={css.wrap}>
        <img src={myPhoto} className={css.accountImg}></img>
        <div className={css.accountInfo}></div>
      </div>
    </div>
  );
};
