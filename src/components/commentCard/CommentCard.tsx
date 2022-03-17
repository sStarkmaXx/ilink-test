import css from './CommentCard.module.css';

export const CommentCard = () => {
  return (
    <div className={css.commentCard}>
      <div className={css.cardHeader}>
        <div className={css.accountGroup}>
          <div className={css.avatar}></div>
          <div className={css.accountName}>Буба Бубенцов</div>
        </div>
        <div className={css.date}>08.01.2022</div>
      </div>
      <div className={css.commentText}>
        Отличный коллектив, руководители понимают сам процесс работы каждого
        сотрудника и помогают всем без исключения. Система KPI позволяет реально
        хорошо зарабатывать по простому принципу - чем больше и лучше ты
        работаешь, тем больше денег получаешь. Соцпакет - отличная страховка
        ДМС, организовали курсы английского языка бесплатно, оплачивают
        тренажерный зал. Зарплату выплачивают всегда вовремя.
      </div>
    </div>
  );
};
