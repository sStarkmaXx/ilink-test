import css from './Carousel.module.css';
import { CommentCard } from '../commentCard/CommentCard';

export const Carousel = () => {
  return (
    <div className={css.carouselCont}>
      <div className={css.wrap}>
        <div className={css.carousel}>
          <div className={css.carouselHeader}>
            <div className={css.text}>Отзывы</div>
            <button className={css.carouselBtn}>+ Добавить отзыв</button>
          </div>
          <div className={css.commentWindow}>
            <CommentCard />
            <CommentCard />
          </div>
        </div>
      </div>
    </div>
  );
};
