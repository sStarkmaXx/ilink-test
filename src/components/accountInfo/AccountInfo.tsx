import css from "./AccountInfo.module.css";

export const AccountInfo = () => {
  return (
    <div className={css.accountCont}>
      <div className={css.wrap}>
        <div className={css.accountImg}></div>
        <div className={css.accountInfo}></div>
      </div>
    </div>
  );
};
