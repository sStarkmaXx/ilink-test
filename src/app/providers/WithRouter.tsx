import { AccountPage } from 'pages/accountPage/AccountPage';
import { HOCControlPanelPage } from 'pages/controlPanelPage/HOCControlPanelPage';
import { ResetPasswordPage } from 'pages/resetPasswordPage/ResetPasswordPage';
import { StartPage } from 'pages/startpage/StartPage';
import { Route, Routes } from 'react-router-dom';

export const WithRouter = () => {
  return (
    <Routes>
      <Route path={'/'} element={<StartPage />} />
      <Route path={'/respas'} element={<ResetPasswordPage />} />
      <Route path={'/profile'} element={<AccountPage />} />
      <Route path={'/controlPanel/*'} element={<HOCControlPanelPage />}></Route>
    </Routes>
  );
};
