import css from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={css.footer}>
      <div className={css.wrap}>
        <div className={css.text}>
          © iLINK ACADEMY. ALL RIGHTS RESERVED. 2022
        </div>
        <div className={css.contactsGroup}></div>
      </div>
    </div>
  );
};
