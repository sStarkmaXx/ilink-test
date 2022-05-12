import { Route, Routes } from 'react-router-dom';
import { AccountList } from '../../entities/account/model/AccountList';
import { ControlPanelPage } from './ControlPanelPage';
import { CommentList } from 'entities/comments/ui/CommentList';
import { EditProfilePage } from 'pages/editProfilePage/EditProfilePage';

export const HOCControlPanelPage = () => {
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
