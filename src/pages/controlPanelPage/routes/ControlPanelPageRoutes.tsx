import { Route, Routes } from 'react-router-dom';
import { AccountList } from 'pages/accountListPage';
import { ControlPanelPage } from '../ui/ControlPanelPage';
import { CommentList } from 'pages/commentsListPage/ui/CommentList';
import { EditProfilePage } from 'pages/editProfilePage';

export const ControlPanelPageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<ControlPanelPage />}>
          <Route path={'accounts/*'} element={<AccountList />}></Route>
          <Route path={'comments/*'} element={<CommentList />}></Route>
          <Route path={'aboutMe'} element={<EditProfilePage />}></Route>
        </Route>
      </Routes>
    </>
  );
};
