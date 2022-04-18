import css from './Account.module.scss';

type StatusType = 'studying' | 'expelled' | 'finished';

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
        <img src="" alt="" />
        <span>
          {account.name} {account.lastName}
        </span>
      </div>
      <div className={css.info}>{account.info}</div>
      <div className={css.status}>
        {account.status === 'studying'
          ? 'Обучается'
          : account.status === 'finished'
          ? 'Закончил'
          : 'Отчислен'}
      </div>
    </div>
  );
};
