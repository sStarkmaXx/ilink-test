import { v1 } from "uuid";

export type commentType = {
  id: string;
  img: string;
  name: string;
  text: string;
  date: string;
};

type commentsStateType = Array<commentType>;

type AddCommentActionType = {
  type: "ADD-COMMENT";
  name: string;
  text: string;
};

export type ActionsType = AddCommentActionType;

const initialState: commentsStateType = [
  {
    id: v1(),
    img: "",
    name: "Буба Бубенцов",
    text:
      "Отличный коллектив, руководители понимают сам процесс работы каждого сотрудника и помогают всем без исключения. Система KPI позволяет реально хорошо зарабатывать по простому принципу - чем больше и лучше ты работаешь, тем больше денег получаешь. Соцпакет - отличная страховка ДМС, организовали курсы английского языка бесплатно, оплачивают тренажерный зал. Зарплату выплачивают всегда вовремя.",
    date: "08.01.22"
  },
  {
    id: v1(),
    img: "",
    name: "Илья Анташкевич",
    text:
      "Год назад попытал счастье, откликнулся на вакансию, прошел собес и попал в компанию. Долго переживал что будет тяжело влиться, но тут прям классные ребята работают, все на одной волне. Всегда готовы помочь с любым вопросом. Для эффективной работы здесь нужно хорошо знать иностранные языки.",
    date: "08.01.22"
  },
  {
    id: v1(),
    img: "",
    name: "Юрина Маргарита",
    text:
      "Наша компания благодарна фирме ilink за сотрудничество. Хотелось бы отметить отличную работу сотрудников: все было выполнено качественно, со знанием дела, в установленные сроки. За время работы с компанией значительно увеличилась аудитория, сайт приносит стабильный доход, контент уникальный, грамотный и качественный. Будет продолжать работу и дальше. Мы довольны, что доверили создание сайта компании ilink.",
    date: "26.12.21"
  },
  {
    id: v1(),
    img: "",
    name: "Дмитрий Иванов",
    text:
      "Год назад попытал счастье, откликнулся на вакансию, прошел собес и попал в компанию. Долго переживал что будет тяжело влиться, но тут прям классные ребята работают, все на одной волне. Всегда готовы помочь с любым вопросом. Для эффективной работы здесь нужно хорошо знать иностранные языки.",
    date: "16.12.21"
  }
];

export const commentsReducer = (
  state: commentsStateType = initialState,
  action: ActionsType
): commentsStateType => {
  switch (action.type) {
    case "ADD-COMMENT":
      const now = new Date().toLocaleDateString();
      const newComment = {
        id: v1(),
        img: "",
        name: action.name,
        text: action.text,
        date: now
      };
      return [newComment, ...state];
    default:
      return state;
  }
};

export const addCommentAC = (
  name: string,
  text: string
): AddCommentActionType => {
  return {
    type: "ADD-COMMENT",
    name,
    text
  };
};
