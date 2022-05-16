import cssForControlPanel from './HeaderForControlPanel.module.scss';
import cssForAccountPage from './HeaderForAccountPage.module.scss';
import logo from './img/white/Group 1.png';
import purpleLogo from './img/LogoPurple.png';
import { NavLink } from 'react-router-dom';
import { useStore } from 'effector-react';
import { accountModel } from '../../../pages/accountPage/accountModel';
import { useEffect } from 'react';

type HeaderType =
  | 'controlPanelHeader'
  | 'entryPageHeader'
  | 'accountPageHeader';

type HeaderPropdType = {
  type: HeaderType;
};

export const Header: React.FC<HeaderPropdType> = ({ type }) => {
  useEffect(() => {
    if (type === 'controlPanelHeader') {
      accountModel.getAccount();
    }
  }, []);
  const account = useStore(accountModel.$account);
  const photo = ' https://academtest.ilink.dev/images/' + account.profileImage;
  return (
    <>
      {type === 'controlPanelHeader' && (
        <div className={cssForControlPanel.header}>
          <div className={cssForControlPanel.headerGroup}>
            <div className={cssForControlPanel.accountGroup}>
              <img src={photo} alt="" />
              <span>
                {account.firstName} {account.lastName}
              </span>
            </div>
            <span>Панель управления</span>
          </div>
          <NavLink to="/ilink-test/profile">
            <img src={logo} className={cssForControlPanel.ilink} alt=""></img>
          </NavLink>
        </div>
      )}
      {type === 'accountPageHeader' && (
        <div className={cssForAccountPage.header}>
          <div className={cssForAccountPage.accountGroup}>
            <img src={photo} alt="" />
            <span>{account.firstName}</span>
          </div>
          <img src={purpleLogo} alt="" />
          <NavLink to="/ilink-test/controlPanel/accounts/1"></NavLink>
        </div>
      )}
    </>
  );
};
