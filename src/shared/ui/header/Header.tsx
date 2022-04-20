import cssForControlPanel from './HeaderForControlPanel.module.scss';
import cssForAccountPage from './HeaderForAccountPage.module.scss';
import logo from './img/white/Group 1.png';
import myPhoto from 'pages/accountPage/img/my_photo.jpg';
import purpleLogo from './img/LogoPurple.png';
import { NavLink } from 'react-router-dom';

type HeaderType =
  | 'controlPanelHeader'
  | 'entryPageHeader'
  | 'accountPageHeader';

type HeaderPropdType = {
  type: HeaderType;
};

export const Header: React.FC<HeaderPropdType> = ({ type }) => {
  return (
    <>
      {type === 'controlPanelHeader' && (
        <div className={cssForControlPanel.header}>
          <div className={cssForControlPanel.headerGroup}>
            <div className={cssForControlPanel.accountGroup}>
              <img src={myPhoto} alt="" />
              <span>Макс Мясников</span>
            </div>
            <span>Панель управления</span>
          </div>
          <NavLink to="">
            <img src={logo} className={cssForControlPanel.ilink} alt=""></img>
          </NavLink>
        </div>
      )}
      {type === 'accountPageHeader' && (
        <div className={cssForAccountPage.header}>
          <div className={cssForAccountPage.accountGroup}>
            <img src={myPhoto} alt="" />
            <span>Макс</span>
          </div>
          <img src={purpleLogo} alt="" />
          <NavLink to="controlPanel"></NavLink>
        </div>
      )}
    </>
  );
};
