import { AccountPage } from 'pages/accountPage/AccountPage';
import { ResetPasswordPage } from 'pages/resetPasswordPage/ResetPasswordPage';
import { StartPage } from 'pages/startpage/StartPage';
import { Route, Routes } from 'react-router-dom';
import { ControlPanelPage } from '../../pages/controlPanelPage/ControlPanelPage';

export const WithRouter = () => {
  return (
    <Routes>
      <Route path={'/'} element={<StartPage />} />
      <Route path={'/respas'} element={<ResetPasswordPage />} />
      <Route path={'/profile'} element={<AccountPage />} />
      <Route path={'/profile/controlPanel'} element={<ControlPanelPage />} />
    </Routes>
  );
};
