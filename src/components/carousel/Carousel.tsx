import css from './Carousel.module.css';
import { CommentCard } from '../commentCard/CommentCard';
import { useState } from 'react';
import { commentType } from '../../App';

type carouselPropsType = {
  openForm: () => void;
  comments: Array<commentType>;
};

export const Carousel: React.FC<carouselPropsType> = ({
  openForm,
  comments,
}) => {
  const [position, setPosition] = useState<number>(0);

  const comment = comments.map((com) => {
    return <CommentCard key={com.id} comment={com} />;
  });

  const handleLeft = () => {
    const newPosition = position + 543;
    if (position < 0) {
      setPosition(newPosition);
    }
  };

  const handleRight = () => {
    const newPosition = position - 543;
    if (position > (-543 * comments.length) / 2) {
      setPosition(newPosition);
    }
  };

  return (
    <div className={css.carouselCont}>
      <div className={css.wrap}>
        <div className={css.carousel}>
          <div className={css.carouselHeader}>
            <div className={css.text}>Отзывы</div>
            <button className={css.addCommentBtn} onClick={openForm}>
              + Добавить отзыв
            </button>
          </div>
          <div className={css.commentWindow}>
            <div
              className={css.allCommentsCont}
              style={{ transform: `translateX(${position}px)` }}
            >
              {comment}
            </div>
          </div>
        </div>
        <div className={css.groupBtns}>
          <button
            className={
              position === 0 ? css.carouselBtnDisable : css.carouselBtnActive
            }
            onClick={handleLeft}
            disabled={position === 0}
          >
            L
          </button>
          <button
            className={
              position > (-543 * comments.length) / 2
                ? css.carouselBtnActive
                : css.carouselBtnDisable
            }
            onClick={handleRight}
            disabled={!(position > (-543 * comments.length) / 2)}
          >
            R
          </button>
        </div>
      </div>
    </div>
  );
};
