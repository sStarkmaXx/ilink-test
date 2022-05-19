import { accountType } from 'entities/account/model/accountModel';
import css from './Account.module.scss';

type AccountPropsType = {
  account: accountType;
};

export const Account: React.FC<AccountPropsType> = ({ account }) => {
  const photo = ' https://academtest.ilink.dev/images/' + account.profileImage;
  return (
    <div className={css.account}>
      <div className={css.accountGroup}>
        <img src={photo} alt="" />
        <span>
          {account.firstName} {account.lastName}
        </span>
      </div>

      <div className={css.info}>{account.aboutMe}</div>
      <div className={css.status}>
        <span data-style={account.academyStatus}>
          {account.academyStatus === 'studies'
            ? 'Обучается'
            : 'не понятный статус)'}
        </span>
      </div>
    </div>
  );
};
