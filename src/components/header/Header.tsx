import css from "./Header.module.css";

export const Header = () => {
  return (
    <div className={css.header}>
      <div className={css.wrap}>
        <div className={css.headerGroup}>
          <div className={css.accountGroup}>
            <div className={css.avatar}></div>
            <div className={css.accountName}>Max Myasnikov</div>
          </div>
          <div className={css.academyName}>ILINK academy</div>
          <button className={css.headerButton}>Панель управления</button>
        </div>
      </div>
    </div>
  );
};
