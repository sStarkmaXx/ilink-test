import vk from './img/vk.png';
import telegram from './img/telegram.png';
import anyy from './img/any.png';
import css from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={css.footer}>
      <div className={css.wrap}>
        <div className={css.text}>
          © iLINK ACADEMY. ALL RIGHTS RESERVED. 2022
        </div>
        <div className={css.contactsGroup}>
          <a href="https://vk.com/ilinkdev">
            <img src={vk} alt="" style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="">
            <img src={anyy} alt="" style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="https://t.me/ilinknetwork">
            <img
              src={telegram}
              alt=""
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#585CC6',
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
