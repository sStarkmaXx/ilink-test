import { accountType } from 'pages/accountPage/accountModel';
import css from './Account.module.scss';

type StatusType = 'Обучается' | 'Закончил' | 'Отчислен' | null;

export type AccountType = {
  id: string;
  name: string;
  lastName: string;
  photo: string;
  info: string;
  status: StatusType;
};

type AccountPropsType = {
  account: accountType;
};

export const Account: React.FC<AccountPropsType> = ({ account }) => {
  const photo = ' https://academtest.ilink.dev/images/' + account.profileImage;
  return (
    <div className={css.account}>
      <div className={css.accountGroup}>
        <img src={photo} />
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
