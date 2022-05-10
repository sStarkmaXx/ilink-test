import { useEffect } from 'react';
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
import { useStore } from 'effector-react';
import { Preloader } from 'shared/ui/preloader/Preloader';
import { modalWindowMadel } from '../../entities/modalWindow/modalWindowModel';
import { toastModel } from '../../shared/ui/toast/toastModel';

export const AccountPage = () => {
  const isLoading = useStore(accountModel.$isLoading);
  const toastText = useStore(toastModel.$toast);
  useEffect(() => {
    accountModel.getAccount();
    commentsModel.getComments();
  }, []);

  const modalWindow = useStore(modalWindowMadel.$modalWindow);
  const toast = useStore(toastModel.$toast);

  console.log('toast', toast);
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
