import { AccountPage } from 'pages/accountPage/AccountPage';
import { HOCControlPanelPage } from 'pages/controlPanelPage/HOCControlPanelPage';
import { ResetPasswordPage } from 'pages/resetPasswordPage/ResetPasswordPage';
import { StartPage } from 'pages/startpage/StartPage';
import { Route, Routes } from 'react-router-dom';

export const WithRouter = () => {
  return (
    <Routes>
      <Route path={'ilink-test/'} element={<StartPage />} />
      <Route path={'ilink-test/respas'} element={<ResetPasswordPage />} />
      <Route path={'ilink-test/profile'} element={<AccountPage />} />
      <Route
        path={'ilink-test/controlPanel/*'}
        element={<HOCControlPanelPage />}
      ></Route>
    </Routes>
  );
};
