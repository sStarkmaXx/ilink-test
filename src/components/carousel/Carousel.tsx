import css from "./Carousel.module.css";

export const Carousel = () => {
  return (
    <div className={css.carouselCont}>
      <div className={css.wrap}>
        <div className={css.carousel}>
          <div className={css.carouselHeader}>
            <div className={css.text}>Отзывы</div>
            <button className={css.carouselBtn}>+ Добавить отзыв</button>
          </div>
          <div className={css.commentWindow}></div>
        </div>
      </div>
    </div>
  );
};
