import css from './Preloader.module.scss';

export const Preloader = () => {
  return (
    <div className={css.layer}>
      <div className={css.preloader}>
        <div className={css.first}></div>
        <div className={css.second}></div>
        <div className={css.third}></div>
      </div>
    </div>
  );
};
