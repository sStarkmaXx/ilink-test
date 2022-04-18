import { v1 } from 'uuid';
import { Account, AccountType } from '../ui/Account';
import css from './AccountList.module.scss';

export const AccountList = () => {
  const accounts: AccountType[] = [
    {
      id: v1(),
      name: 'Буба',
      lastName: 'Бубенцов',
      photo: '',
      info: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
      status: 'finished',
    },
    {
      id: v1(),
      name: 'Илья',
      lastName: 'Анташкевич',
      photo: '',
      info: 'Художник и иллюстратор. Рисую обаятельные и точные портреты из окружающей жизни.',
      status: 'expelled',
    },
    {
      id: v1(),
      name: 'Леброн',
      lastName: 'Джеймс',
      photo: '',
      info: 'Звуковой художник, куратор и музыкальный продюсер. Работал как аранжировщик и композитор с популярными исполнителями.',
      status: 'finished',
    },
    {
      id: v1(),
      name: 'Натали',
      lastName: 'Трамп',
      photo: '',
      info: 'Изучаю цифровой дизайн, программирование и управление проектами.',
      status: 'studying',
    },
    {
      id: v1(),
      name: 'Валентина',
      lastName: 'Матанина',
      photo: '',
      info: 'Звуковой художник, куратор и музыкальный продюсер. Работал как аранжировщик и композитор с популярными исполнителями.',
      status: 'finished',
    },
    {
      id: v1(),
      name: 'Лев',
      lastName: 'Кошкин',
      photo: '',
      info: 'Изучаю цифровой дизайн, программирование и управление проектами.',
      status: 'expelled',
    },
    {
      id: v1(),
      name: 'Антоха',
      lastName: 'Антонов',
      photo: '',
      info: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
      status: 'studying',
    },
    {
      id: v1(),
      name: 'Александр',
      lastName: 'Александров',
      photo: '',
      info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis totam id dolorem reprehenderit perferendis, nostrum sequi quod consequatur veritatis? Numquam asperiores, aliquid sit natus quod dolorem autem. Eius, iste eveniet.',
      status: 'finished',
    },
    {
      id: v1(),
      name: 'Дим',
      lastName: 'Димыч',
      photo: '',
      info: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
      status: 'expelled',
    },
    {
      id: v1(),
      name: 'Дядя',
      lastName: 'Фёдор',
      photo: '',
      info: 'Люблю пепперони и старые серии смешариков. А вы были на Таити?',
      status: 'studying',
    },
  ];

  const acount = accounts.map((acc) => <Account account={acc} />);
  return (
    <div className={css.accountList}>
      <div className={css.header}>
        <span>ИФ УЧЕНИКА</span>
        <span>КРАТКАЯ ИНФОРМАЦИЯ</span>
        <span>СТАТУС</span>
      </div>
      {acount}
    </div>
  );
};
