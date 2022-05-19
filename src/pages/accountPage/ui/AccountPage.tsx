import { useEffect } from 'react';
import { AccountInfo } from 'pages/accountPage/ui/accountInfo/AccountInfo';
import { Carousel } from 'widgets/carousel';
import { CommentForm } from 'widgets/commentForm';
import { Footer } from 'widgets/footer';
import { Header } from 'widgets/header';
import { Toast } from 'shared/ui/toast';
import vector from '../img/vector.png';
import css from './AccountPage.module.scss';
import { accountModel } from 'entities/account/model/accountModel';
import { commentsModel } from 'entities/comment/model/comment';
import { useStore } from 'effector-react';
import { Preloader } from 'shared/ui/preloader';
import { modalWindowMadel } from 'entities/modalWindow/model/modalWindowModel';
import { toastModel } from 'shared/ui/toast/model/toastModel';

export const AccountPage = () => {
  const isLoading = useStore(accountModel.$isLoading);
  const toastText = useStore(toastModel.$toast);
  useEffect(() => {
    accountModel.getAccount();
    commentsModel.getComments();
  }, []);

  const modalWindow = useStore(modalWindowMadel.$modalWindow);
  const toast = useStore(toastModel.$toast);

  const closeToast = () => {
    toastModel.showHideToast(null);
  };

  return (
    <>
      <div
        className={css.accountPage}
        style={{ backgroundImage: `url(${vector})` }}
      >
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <Header type={'accountPageHeader'} />
            <div className={css.greetings}>
              Добро пожаловать <br></br>в академию!
            </div>
            <AccountInfo />
            <Carousel />
            <Footer />
          </>
        )}
      </div>
      {modalWindow && <CommentForm />}
      {toast && (
        <Toast closeToast={closeToast} error={false} text={toastText} />
      )}
    </>
  );
};
