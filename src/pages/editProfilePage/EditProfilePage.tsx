import { DropDown } from 'shared/dropDown/DropDown';
import css from './EditProfilePage.module.scss';
import { ChangeEvent, useState, useEffect } from 'react';
import { v1 } from 'uuid';
import { nameLastNameRegEx } from 'shared/regexp/nameLastNameRegExp';
import { cities } from './cities';
import { accountModel } from '../accountPage/accountModel';
import { useStore } from 'effector-react';

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

export const EditProfilePage = () => {
  useEffect(() => accountModel.getAccount(), []);
  const account = useStore(accountModel.$account);
  const isLoading = accountModel.$isLoading;
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

  const [name, setName] = useState<string>(account.firstName);
  const [lastName, setLastName] = useState<string>(account.lastName);
  const [birthday, setBirthday] = useState<string>(
    new Date(account.birthDate).toLocaleDateString()
  );
  const [city, setCity] = useState<string>(account.cityOfResidence);
  const [sex, setSex] = useState<string>(account.gender);
  const [pet, setPet] = useState<boolean | string>(account.hasPet);
  const [info, setInfo] = useState<string | null>(account.smallAboutMe);
  const [about, setAbout] = useState<string>(account.aboutMe);

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

  const onClickSetPet = (pet: boolean | string) => {
    setPet(pet);
  };

  const save = () => {
    console.log(
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

  const aboutError = about.trim() === '';
  const datePattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  const dateError =
    new Date().getTime() <
    Date.parse(birthday.replace(datePattern, '$3-$2-$1'));
  const saveButtonDisable =
    nameError || lastNameError || aboutError || dateError;

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
            startValue={account.cityOfResidence}
            canOpen={saveButton}
            clBack={onClickSetCity}
            needSearch={true}
          />
        </div>
        <div className={css.el}>
          <label>Пол</label>
          <DropDown
            valuesList={['Мужчина', 'Женщина']}
            startValue={account.gender}
            canOpen={saveButton}
            clBack={onClickSetSex}
          />
        </div>
        <div className={css.el}>
          <label>Животное</label>
          <DropDown
            valuesList={['Есть', 'Нет']}
            startValue={account.hasPet ? 'Есть' : 'Нет'}
            canOpen={saveButton}
            clBack={onClickSetPet}
          />
        </div>
        <div className={css.el}>
          <label>Краткая информация</label>
          <div
            className={css.length}
            data-length={`${info ? info.length : '0'}/99`}
          >
            <textarea
              className={css.info}
              value={info ? info : ''}
              onChange={onChangeInfo}
              maxLength={99}
              //style={infoError ? { border: '1px red solid' } : {}}
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
