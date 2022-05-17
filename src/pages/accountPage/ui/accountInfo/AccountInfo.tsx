import css from './AccountInfo.module.css';
import sex from '../../img/sex.png';
import pet from '../../img/pet.png';
import { useStore } from 'effector-react';
import { accountModel } from 'entities/account/model/accountModel';

export const AccountInfo = () => {
  const account = useStore(accountModel.$account);
  const birthDate = new Date(account.birthDate);
  const now = new Date();
  let age = now.getFullYear() - birthDate.getFullYear();
  const photo = ' https://academtest.ilink.dev/images/' + account.profileImage;
  if (
    now.setFullYear(birthDate.getFullYear()) <
    birthDate.setFullYear(birthDate.getFullYear())
  ) {
    age = age - 1;
  }
  return (
    <div className={css.accountCont}>
      <div className={css.wrap}>
        <div className={css.accountImg}>
          <img src={photo} alt="" className={css.img} />
        </div>
        <div className={css.accountInfo}>
          <div className={css.header}>
            <div className={css.name}>
              {account.firstName} {account.lastName}
            </div>
            <div className={css.date}>{birthDate.toLocaleDateString()}</div>
          </div>
          <div className={css.info}>
            <div className={css.field}>
              <b>Город: </b> {account.cityOfResidence}
            </div>
            <div className={css.field}>
              <b>Пол: </b> {account.gender === 'male' ? 'Мужчина' : 'Женщина'}
              <img
                src={sex}
                alt=""
                style={{ marginLeft: '8px', height: '13px' }}
              />
            </div>
            <div className={css.field}>
              <b>Возраст: </b> {age}
            </div>
          </div>
          <div className={css.aboutMe}>
            <b>О себе: </b> {account.aboutMe}
          </div>
          <div className={css.pet}>
            <img
              src={pet}
              alt=""
              style={{ marginRight: '8px', height: '16px', width: '24px' }}
            />
            <b> Домашнее животное: </b> {account.hasPet ? 'Есть' : 'Нет'}
          </div>
        </div>
      </div>
    </div>
  );
};
