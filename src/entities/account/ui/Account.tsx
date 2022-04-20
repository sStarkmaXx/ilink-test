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
  account: AccountType;
};

export const Account: React.FC<AccountPropsType> = ({ account }) => {
  return (
    <div className={css.account}>
      <div className={css.accountGroup}>
        <div className={css.photo}>{account.photo}</div>
        <span>
          {account.name} {account.lastName}
        </span>
      </div>
      <div className={css.info}>{account.info}</div>
      <div className={css.status}>
        <span data-style={account.status}>{account.status}</span>
      </div>
    </div>
  );
};
