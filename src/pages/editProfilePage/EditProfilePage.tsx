import { DropDown } from 'shared/dropDown/DropDown';
import css from './EditProfilePage.module.scss';
import { ChangeEvent, useState } from 'react';
import { v1 } from 'uuid';
import { nameLastNameRegEx } from 'shared/regexp/nameLastNameRegExp';
import { cities } from './cities';

type ProfileType = {
  id: string;
  name: string;
  lastName: string;
  birthday: string;
  city: string;
  sex: string;
  pet: string;
  info: string;
  about: string;
};

const profile: ProfileType = {
  id: v1(),
  name: 'Макс',
  lastName: 'Мясников',
  birthday: '01.06.1990',
  city: 'Томск',
  sex: 'Мужчина',
  pet: 'Есть',
  info: 'Машина - лучший психолог!',
  about:
    'Всем КУ!Меня зовут Макс, учусь на Fронтендера, работаю конструктором. В свободное время играю в видео игры ;)',
};

export const EditProfilePage = () => {
  const [editButton, setEditButton] = useState<boolean>(true);
  const [saveButton, setSaveButton] = useState<boolean>(false);
  const onClickEdit = () => {
    setEditButton(false);
    setSaveButton(true);
  };

  const onClickSave = () => {
    setEditButton(true);
    setSaveButton(false);
    save();
  };

  const [name, setName] = useState<string>(profile.name);
  const [lastName, setLastName] = useState<string>(profile.lastName);
  const [birthday, setBirthday] = useState<string>(profile.birthday);
  const [city, setCity] = useState<string>(profile.city);
  const [sex, setSex] = useState<string>(profile.sex);
  const [pet, setPet] = useState<string>(profile.pet);
  const [info, setInfo] = useState<string>(profile.info);
  const [about, setAbout] = useState<string>(profile.about);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    saveButton && setName(e.currentTarget.value);
  };
  const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    saveButton && setLastName(e.currentTarget.value);
  };
  const onChangeBirthday = (e: ChangeEvent<HTMLInputElement>) => {
    saveButton && setBirthday(e.currentTarget.value);
  };
  const onChangeInfo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    saveButton && setInfo(e.currentTarget.value);
  };
  const onChangeAbout = (e: ChangeEvent<HTMLTextAreaElement>) => {
    saveButton && setAbout(e.currentTarget.value);
  };

  const onClickSetCity = (city: string) => {
    setCity(city);
    console.log(city);
  };

  const onClickSetSex = (sex: string) => {
    setSex(sex);
  };

  const onClickSetPet = (pet: string) => {
    setPet(pet);
  };

  const save = () => {
    profile.name = name;
    profile.lastName = lastName;
    profile.birthday = birthday;
    profile.city = city;
    profile.sex = sex;
    profile.pet = pet;
    profile.info = info;
    profile.about = about;
    console.log(
      profile,
      dateError,
      'сегодня',
      new Date().getTime(),
      'вписали',
      Date.parse(birthday.replace(datePattern, '$3-$2-$1'))
    );
  };

  const nameError = name.trim() === '' || !nameLastNameRegEx.test(name);
  const lastNameError =
    lastName.trim() === '' || !nameLastNameRegEx.test(lastName);
  const infoError = info.trim() === '';
  const aboutError = about.trim() === '';
  const datePattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  const dateError =
    new Date().getTime() <
    Date.parse(birthday.replace(datePattern, '$3-$2-$1'));
  const saveButtonDisable =
    nameError || lastNameError || aboutError || dateError || infoError;

  const [fileSize, setFileSize] = useState<number>(0);

  const onClickSelectImg = (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (file) {
      setFileSize(file.size);
    }
  };

  const fileError = fileSize > 5242880;

  return (
    <div className={css.aboutMe}>
      <span>{'Обо мне'}</span>
      <div className={css.header}>
        <div className={css.accountGroup}>
          <div className={css.ava}></div>
          <div className={css.text}>
            <p>Фото профиля</p>
            <label
              htmlFor="loadFile"
              data-size={fileError ? 'Размер файла должен быть меньше 5мб' : ''}
              style={fileError ? { color: 'red' } : {}}
            >
              Изменить фото
            </label>
            <input
              type={'file'}
              accept={'.png, .jpeg, .jpg'}
              id="loadFile"
              style={{ display: 'none' }}
              onChange={onClickSelectImg}
            ></input>
          </div>
        </div>
        {editButton && (
          <button className={css.button} onClick={onClickEdit}>
            Редактировать
          </button>
        )}
      </div>
      <div className={css.container}>
        <div className={css.el}>
          <label htmlFor="name">Имя</label>
          <input
            type={'text'}
            name="name"
            value={name}
            onChange={onChangeName}
            data-style={nameError ? 'error' : ''}
            placeholder={nameError ? 'Поле обязательно для заполнения!' : ''}
          ></input>
        </div>
        <div className={css.el}>
          <label htmlFor="lastName">Фамилия</label>
          <input
            type={'text'}
            name="lastName"
            value={lastName}
            onChange={onChangeLastName}
            data-style={lastNameError ? 'error' : ''}
            placeholder={
              lastNameError ? 'Поле обязательно для заполнения!' : ''
            }
          ></input>
        </div>
        <div className={css.el}>
          <label htmlFor="date">Дата рождения</label>
          <input
            type={'text'}
            name="date"
            value={birthday}
            onChange={onChangeBirthday}
            data-style={dateError ? 'error' : ''}
            placeholder={dateError ? 'Поле обязательно для заполнения!' : ''}
          ></input>
        </div>
        <div className={css.el}>
          <label>Город</label>
          <DropDown
            valuesList={cities}
            startValue={profile.city}
            canOpen={saveButton}
            clBack={onClickSetCity}
            needSearch={true}
          />
        </div>
        <div className={css.el}>
          <label>Пол</label>
          <DropDown
            valuesList={['Мужчина', 'Женщина']}
            startValue={profile.sex}
            canOpen={saveButton}
            clBack={onClickSetSex}
          />
        </div>
        <div className={css.el}>
          <label>Животное</label>
          <DropDown
            valuesList={['Есть', 'Нет']}
            startValue={profile.pet}
            canOpen={saveButton}
            clBack={onClickSetPet}
          />
        </div>
        <div className={css.el}>
          <label>Краткая информация</label>
          <div className={css.length} data-length={`${info.length}/99`}>
            <textarea
              className={css.info}
              value={info}
              onChange={onChangeInfo}
              maxLength={99}
              style={infoError ? { border: '1px red solid' } : {}}
            ></textarea>
          </div>
        </div>

        <div className={css.el}>
          <label>О себе</label>
          <div className={css.length} data-length={`${about.length}/300`}>
            <textarea
              className={css.about}
              value={about}
              onChange={onChangeAbout}
              maxLength={300}
              style={aboutError ? { border: '1px red solid' } : {}}
            ></textarea>
          </div>
        </div>

        {saveButton && (
          <button
            className={css.button}
            onClick={onClickSave}
            disabled={saveButtonDisable}
          >
            Сохранить изменения
          </button>
        )}
      </div>
    </div>
  );
};
