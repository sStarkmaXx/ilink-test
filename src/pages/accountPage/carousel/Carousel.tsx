import css from './Carousel.module.css';
import { CommentCard } from 'shared/ui/commentCard/CommentCard';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { commentsModel } from '../../../entities/comments/comments';

type carouselPropsType = {
  openForm: () => void;
};

export const Carousel: React.FC<carouselPropsType> = ({ openForm }) => {
  const comments = useStore(commentsModel.$comments);
  console.log('коменты из карусели', comments.length);

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
    if (position > -543 * comments.length) {
      setPosition(newPosition);
    }
  };

  return (
    <div className={css.carouselCont}>
      <div className={css.wrap}>
        <div className={css.carousel}>
          <div className={css.carouselHeader}>
            <div className={css.text}>Отзывы</div>
            <button className={css.addCommentBtn} onClick={openForm}></button>
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
              position === 0
                ? css.carouselBtnDisLeft
                : css.carouselBtnActiveLeft
            }
            onClick={handleLeft}
            disabled={position === 0}
          ></button>
          <button
            className={
              position - 543 * 2 > -543 * comments.length
                ? css.carouselBtnActiveRight
                : css.carouselBtnDisRight
            }
            onClick={handleRight}
            disabled={!(position - 543 * 2 > -543 * comments.length)}
          ></button>
        </div>
      </div>
    </div>
  );
};
