import css from './Carousel.module.css';
import { CommentCard } from '../commentCard/CommentCard';
import { useState } from 'react';
import { v1 } from 'uuid';

export type commentType = {
  id: string;
  img: string;
  name: string;
  text: string;
};

export const Carousel = () => {
  const [comments, setComment] = useState<Array<commentType>>([
    {
      id: v1(),
      img: '',
      name: 'Буба Бубенцов',
      text: 'Отличный коллектив, руководители понимают сам процесс работы каждого сотрудника и помогают всем без исключения. Система KPI позволяет реально хорошо зарабатывать по простому принципу - чем больше и лучше ты работаешь, тем больше денег получаешь. Соцпакет - отличная страховка ДМС, организовали курсы английского языка бесплатно, оплачивают тренажерный зал. Зарплату выплачивают всегда вовремя.',
    },
    {
      id: v1(),
      img: '',
      name: 'Илья Анташкевич',
      text: 'Год назад попытал счастье, откликнулся на вакансию, прошел собес и попал в компанию. Долго переживал что будет тяжело влиться, но тут прям классные ребята работают, все на одной волне. Всегда готовы помочь с любым вопросом. Для эффективной работы здесь нужно хорошо знать иностранные языки.',
    },
    {
      id: v1(),
      img: '',
      name: 'Юрина Маргарита',
      text: 'Наша компания благодарна фирме ilink за сотрудничество. Хотелось бы отметить отличную работу сотрудников: все было выполнено качественно, со знанием дела, в установленные сроки. За время работы с компанией значительно увеличилась аудитория, сайт приносит стабильный доход, контент уникальный, грамотный и качественный. Будет продолжать работу и дальше. Мы довольны, что доверили создание сайта компании ilink.',
    },
    {
      id: v1(),
      img: '',
      name: 'Дмитрий Иванов',
      text: 'Год назад попытал счастье, откликнулся на вакансию, прошел собес и попал в компанию. Долго переживал что будет тяжело влиться, но тут прям классные ребята работают, все на одной волне. Всегда готовы помочь с любым вопросом. Для эффективной работы здесь нужно хорошо знать иностранные языки.',
    },
  ]);

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
            <button className={css.addCommentBtn}>+ Добавить отзыв</button>
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
