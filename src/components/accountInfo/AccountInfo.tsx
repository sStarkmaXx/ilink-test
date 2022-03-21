import css from "./AccountInfo.module.css";
import myPhoto from "./img/my_photo.jpg";
import sex from "./img/sex.png";
import pet from "./img/pet.png";

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
              <b>Город: </b> Томск
            </div>
            <div className={css.field}>
              <b>Пол: </b> мужчина{" "}
              <img src={sex} alt="" style={{ marginLeft: "10px" }} />
            </div>
            <div className={css.field}>
              <b>Возраст: </b> 31
            </div>
          </div>
          <div className={css.aboutMe}>
            <b>О себе: </b> Всем Привет! Меня зовут Макс, мне 31 год. Работаю
            конструктором в проектной конторе, учусь на FrontEnd разработчика.
            Изучаю React, Redux, TypeScript. В данном проекте я использовал
            Redux для добавления комментариев. Тосты реагируют на правильнось
            заполнения полей.
          </div>
          <div className={css.field}>
            <img src={pet} alt="" style={{ marginRight: "12px" }} />
            <b> Домашнее животное: </b> кошка
          </div>
        </div>
      </div>
    </div>
  );
};
