import css from './AccountInfo.module.css';
import myPhoto from './img/my_photo.jpg';

export const AccountInfo = () => {
  return (
    <div className={css.accountCont}>
      <div className={css.wrap}>
        <img src={myPhoto} className={css.accountImg}></img>
        <div className={css.accountInfo}>
          <div className={css.header}>
            <div className={css.name}>Макс Мясников</div>
            <div className={css.date}>01.06.1990</div>
          </div>
          <div className={css.info}>
            <div className={css.field}>
              <b>Город: </b>Томск
            </div>
            <div className={css.field}>
              <b>Пол: </b>мужчина <img src="" alt="" />
            </div>
            <div className={css.field}>
              <b>Возраст: </b>31
            </div>
          </div>
          <div className={css.aboutMe}>
            <b>О себе: </b>
          </div>
          <div className={css.field}>
            {' '}
            <img src="" alt="" />
            <b>Домашнее животное: </b>есть
          </div>
        </div>
      </div>
    </div>
  );
};
