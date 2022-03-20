import css from './Header.module.css';
import ilink from './img/ilink.png';
import academy from './img/ACADEMY.png';
import myPhoto from '../accountInfo/img/my_photo.jpg';

export const Header = () => {
  return (
    <div className={css.header}>
      <div className={css.wrap}>
        <div className={css.headerGroup}>
          <div className={css.accountGroup}>
            <div
              className={css.avatar}
              style={{ backgroundImage: `url(${myPhoto})` }}
            ></div>
            <div className={css.accountName}>Макс Мясников</div>
          </div>
          <div className={css.academyName}>
            <img src={ilink} className={css.ilink}></img>
            <img src={academy} className={css.academy}></img>
          </div>
          <button className={css.headerButton}>Панель управления</button>
        </div>
      </div>
    </div>
  );
};
