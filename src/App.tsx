import './App.css';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Greetings } from './components/greetings/Greetings';
import { AccountInfo } from './components/accountInfo/AccountInfo';
import { Carousel } from './components/carousel/Carousel';
import { CommentForm } from './components/commentForm/CommentForm';
import { useState } from 'react';
import { v1 } from 'uuid';
import { Toast } from './components/toast/Toast';
import vector from './img/vector.png';

export type commentType = {
  id: string;
  img: string;
  name: string;
  text: string;
  date: string;
};

function App() {
  const [formState, setFormState] = useState<boolean>(false);
  const openForm = () => {
    setFormState(true);
  };
  const closeForm = () => {
    setFormState(false);
  };

  const [toast, setShoeToast] = useState<boolean>(false);
  const showToast = () => {
    setShoeToast(true);
  };

  const closeToast = () => {
    setShoeToast(false);
  };

  const [comments, setComment] = useState<Array<commentType>>([
    {
      id: v1(),
      img: '',
      name: 'Буба Бубенцов',
      text: 'Отличный коллектив, руководители понимают сам процесс работы каждого сотрудника и помогают всем без исключения. Система KPI позволяет реально хорошо зарабатывать по простому принципу - чем больше и лучше ты работаешь, тем больше денег получаешь. Соцпакет - отличная страховка ДМС, организовали курсы английского языка бесплатно, оплачивают тренажерный зал. Зарплату выплачивают всегда вовремя.',
      date: '08.01.22',
    },
    {
      id: v1(),
      img: '',
      name: 'Илья Анташкевич',
      text: 'Год назад попытал счастье, откликнулся на вакансию, прошел собес и попал в компанию. Долго переживал что будет тяжело влиться, но тут прям классные ребята работают, все на одной волне. Всегда готовы помочь с любым вопросом. Для эффективной работы здесь нужно хорошо знать иностранные языки.',
      date: '08.01.22',
    },
    {
      id: v1(),
      img: '',
      name: 'Юрина Маргарита',
      text: 'Наша компания благодарна фирме ilink за сотрудничество. Хотелось бы отметить отличную работу сотрудников: все было выполнено качественно, со знанием дела, в установленные сроки. За время работы с компанией значительно увеличилась аудитория, сайт приносит стабильный доход, контент уникальный, грамотный и качественный. Будет продолжать работу и дальше. Мы довольны, что доверили создание сайта компании ilink.',
      date: '26.12.21',
    },
    {
      id: v1(),
      img: '',
      name: 'Дмитрий Иванов',
      text: 'Год назад попытал счастье, откликнулся на вакансию, прошел собес и попал в компанию. Долго переживал что будет тяжело влиться, но тут прям классные ребята работают, все на одной волне. Всегда готовы помочь с любым вопросом. Для эффективной работы здесь нужно хорошо знать иностранные языки.',
      date: '16.12.21',
    },
  ]);

  const addComment = (name: string, text: string) => {
    const now = new Date().toLocaleDateString();
    const newComment = { id: v1(), img: '', name, text, date: now };
    setComment([newComment, ...comments]);
  };

  return (
    <>
      <div className="App" style={{ backgroundImage: `url(${vector})` }}>
        <Header />
        <Greetings />
        <AccountInfo />
        <Carousel openForm={openForm} comments={comments} />
        <Footer />
      </div>
      {formState && (
        <CommentForm
          closeForm={closeForm}
          addComment={addComment}
          showToast={showToast}
        />
      )}
      {toast && <Toast closeToast={closeToast} />}
    </>
  );
}

export default App;
