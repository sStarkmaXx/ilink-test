import { useState, useEffect } from 'react';
import { AccountInfo } from './accountInfo/AccountInfo';
import { Carousel } from './carousel/Carousel';
import { CommentForm } from 'components/commentForm/CommentForm';
import { Footer } from 'shared/ui/footer/Footer';
import { Header } from 'shared/ui/header/Header';
import { Toast } from 'shared/ui/toast/Toast';
import vector from './img/vector.png';
import css from './AccountPage.module.scss';
import { accountModel } from './accountModel';
import { commentsModel } from '../../entities/comments/comments';

export const AccountPage = () => {
  useEffect(() => {
    accountModel.getAccount();
    commentsModel.getComments();
  }, []);
  const [formState, setFormState] = useState<boolean>(false);
  const openForm = () => {
    setFormState(true);
  };
  const closeForm = () => {
    setFormState(false);
  };

  const [toast, setShoeToast] = useState<boolean>(false);
  const showToast = () => {
    setShoeToast(true);
  };

  const closeToast = () => {
    setShoeToast(false);
  };

  return (
    <>
      <div
        className={css.accountPage}
        style={{ backgroundImage: `url(${vector})` }}
      >
        <Header type={'accountPageHeader'} />
        <div className={css.greetings}>
          Добро пожаловать <br></br>в академию!
        </div>
        <AccountInfo />
        <Carousel openForm={openForm} />
        <Footer />
      </div>
      {formState && <CommentForm closeForm={closeForm} showToast={showToast} />}
      {toast && <Toast closeToast={closeToast} error={null} text={''} />}
    </>
  );
};
