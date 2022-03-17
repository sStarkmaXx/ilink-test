import css from "./Greetings.module.css";

export const Greetings = () => {
  return (
    <div className={css.greetings}>
      <div className={css.wrap}>
        <div className={css.text}>
          Добро пожаловать <br /> в академию!
        </div>
      </div>
    </div>
  );
};
