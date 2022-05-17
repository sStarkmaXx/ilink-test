import { AccountPage } from 'pages/accountPage';
import { ResetPasswordPage } from 'pages/resetPasswordPage';
import { StartPage } from 'pages/startpage';
import { Route, Routes } from 'react-router-dom';
import { ControlPanelPageRoutes } from 'pages/controlPanelPage';

export const WithRouter = () => {
  return (
    <Routes>
      <Route path={'ilink-test/'} element={<StartPage />} />
      <Route path={'ilink-test/respas'} element={<ResetPasswordPage />} />
      <Route path={'ilink-test/profile'} element={<AccountPage />} />
      <Route
        path={'ilink-test/controlPanel/*'}
        element={<ControlPanelPageRoutes />}
      ></Route>
    </Routes>
  );
};
