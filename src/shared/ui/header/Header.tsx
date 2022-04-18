import css from './Header.module.scss';
import logo from './img/white/Group 1.png';
import myPhoto from 'pages/accountPage/img/my_photo.jpg';
import { NavLink } from 'react-router-dom';

type HeaderType =
  | 'controlPanelHeader'
  | 'entryPageHeader'
  | 'accountPageHeader';

type HeaderPropdType = {
  type: HeaderType;
};

export const Header: React.FC<HeaderPropdType> = () => {
  let screenWidth = window.screen.width;
  return (
    <div className={css.header}>
      <div className={css.headerGroup}>
        <div className={css.accountGroup}>
          <img src={myPhoto} alt="" />
          <span>Макс Мясников</span>
        </div>
        <span>Панель управления</span>
      </div>
      <NavLink to="">
        <img src={logo} className={css.ilink} alt=""></img>
      </NavLink>

      {/* <button
          className={
            screenWidth > 820 ? css.headerButton : css.miniHeaderButton
          }
        >
          {screenWidth > 820 && 'Панель управления'}
        </button> */}
    </div>
  );
};
