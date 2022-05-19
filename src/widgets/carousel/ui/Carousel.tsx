import css from './Carousel.module.css';
import { CommentCard } from 'shared/ui/commentCard';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { commentModel } from 'entities/comment/model/comment';
import { modalWindowMadel } from 'entities/modalWindow/model/modalWindowModel';

export const Carousel = () => {
  const comments = useStore(commentModel.$comments);
  //console.log('коменты из карусели', comments.length);
  const filteredComments = comments
    .filter((com) => com.status === 'approved')
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  const showModal = () => {
    modalWindowMadel.showHideModal(true);
  };
  const [position, setPosition] = useState<number>(0);

  const comment = filteredComments.map((com) => {
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
    if (position > -543 * filteredComments.length) {
      setPosition(newPosition);
    }
  };

  return (
    <div className={css.carouselCont}>
      <div className={css.wrap}>
        <div className={css.carousel}>
          <div className={css.carouselHeader}>
            <div className={css.text}>Отзывы</div>
            <button className={css.addCommentBtn} onClick={showModal}></button>
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
              position - 543 * 2 > -543 * filteredComments.length
                ? css.carouselBtnActiveRight
                : css.carouselBtnDisRight
            }
            onClick={handleRight}
            disabled={!(position - 543 * 2 > -543 * filteredComments.length)}
          ></button>
        </div>
      </div>
    </div>
  );
};
