import css from './Carousel.module.css';
import { CommentCard } from 'shared/ui/commentCard/CommentCard';
import { useState } from 'react';
import { commentType } from 'store/commentsReducer';
import { AppRootStateType } from 'store/store';
import { useSelector } from 'react-redux';
import plus from './img/plus.png';

type carouselPropsType = {
  openForm: () => void;
};

export const Carousel: React.FC<carouselPropsType> = ({ openForm }) => {
  const [position, setPosition] = useState<number>(0);

  let screenWidth = window.screen.width;

  const comments = useSelector<AppRootStateType, Array<commentType>>(
    (state) => state.comments
  );

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
              <img src={plus} alt="" /> {screenWidth > 820 && ' Добавить отзыв'}
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
        {screenWidth > 820 && (
          <div className={css.groupBtns}>
            <button
              className={
                position === 0
                  ? css.carouselBtnDisLeft
                  : css.carouselBtnActiveLeft
              }
              onClick={handleLeft}
              disabled={position === 0}
            ></button>
            <button
              className={
                position > (-543 * comments.length) / 2
                  ? css.carouselBtnActiveRight
                  : css.carouselBtnDisRight
              }
              onClick={handleRight}
              disabled={!(position > (-543 * comments.length) / 2)}
            ></button>
          </div>
        )}
      </div>
    </div>
  );
};
