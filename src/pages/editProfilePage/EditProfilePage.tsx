import { DropDown } from 'shared/dropDown/DropDown';
import css from './EditProfilePage.module.scss';
import { ChangeEvent, useState, useEffect } from 'react';
import { nameLastNameRegEx } from 'shared/regexp/nameLastNameRegExp';
import { cities } from './cities';
import {
  accountModel,
  genderType,
  newProfileInfoType,
} from '../accountPage/accountModel';
import { useStore } from 'effector-react';
import { Preloader } from 'shared/ui/preloader/Preloader';
import { photoModel } from 'entities/photo/photo';

export const EditProfilePage = () => {
  useEffect(() => accountModel.getAccount(), []);
  const account = useStore(accountModel.$account);
  useEffect(() => {
    setName(account.firstName);
    setLastName(account.lastName);
    setBirthday(new Date(account.birthDate).toISOString().slice(0, 10));
    setCity(account.cityOfResidence);
    setSex(account.gender);
    setPet(account.hasPet);
    setInfo(account.smallAboutMe);
    setAbout(account.aboutMe);
  }, [account]);

  const isLoading = useStore(accountModel.$isLoading);
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

  const photo = ' https://academtest.ilink.dev/images/' + account.profileImage;
  const [name, setName] = useState<string>(account.firstName);
  const [lastName, setLastName] = useState<string>(account.lastName);
  const [birthday, setBirthday] = useState<string>(
    new Date(account.birthDate).toISOString().slice(0, 10)
  );
  const [city, setCity] = useState<string>(account.cityOfResidence);
  const [sex, setSex] = useState<genderType>(account.gender);
  const [pet, setPet] = useState<boolean>(account.hasPet);
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
    if (sex === '??????????????') {
      setSex('male');
    } else {
      setSex('female');
    }
  };

  const onClickSetPet = (pet: string) => {
    if (pet === '????????') {
      setPet(true);
    } else {
      setPet(false);
    }
  };

  const save = () => {
    const newProfileInfo: newProfileInfoType = {
      firstName: name,
      lastName: lastName,
      birthDate: new Date(birthday).toDateString(),
      cityOfResidence: city,
      gender: sex,
      hasPet: pet,
      smallAboutMe: info,
      aboutMe: about,
    };

    console.log('newProfileInfo', newProfileInfo);
    accountModel.updateProfileInfo(newProfileInfo);
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
  const fileError = fileSize > 5242880;
  const onClickSelectImg = (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (file) {
      setFileSize(file.size);
      if (!fileError) {
        photoModel.setPhoto(file);
        photoModel.updateProfilePhoto();
      }
    }
  };
  const [showBigPhoto, setShowBigPhoto] = useState<boolean>(false);
  const showBigPhotoFN = () => {
    setShowBigPhoto(true);
  };
  const hideBigPhotoFN = () => {
    setShowBigPhoto(false);
  };

  return (
    <div className={css.aboutMe}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <span>{'?????? ??????'}</span>
          <div className={css.header}>
            <div className={css.accountGroup}>
              <div
                className={css.ava}
                style={{ backgroundImage: `url(${photo})` }}
                onMouseEnter={showBigPhotoFN}
                onMouseLeave={hideBigPhotoFN}
              ></div>
              {showBigPhoto && (
                <div
                  className={css.bigAva}
                  style={{ backgroundImage: `url(${photo})` }}
                ></div>
              )}
              <div className={css.text}>
                <p>???????? ??????????????</p>
                <label
                  htmlFor="loadFile"
                  data-size={
                    fileError ? '???????????? ?????????? ???????????? ???????? ???????????? 5????' : ''
                  }
                  style={fileError ? { color: 'red' } : {}}
                >
                  ???????????????? ????????
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
                ??????????????????????????
              </button>
            )}
          </div>
          <div className={css.container}>
            <div className={css.el}>
              <label htmlFor="name">??????</label>
              <input
                type={'text'}
                name="name"
                value={name}
                onChange={onChangeName}
                data-style={nameError ? 'error' : ''}
                placeholder={
                  nameError ? '???????? ?????????????????????? ?????? ????????????????????!' : ''
                }
              ></input>
            </div>
            <div className={css.el}>
              <label htmlFor="lastName">??????????????</label>
              <input
                type={'text'}
                name="lastName"
                value={lastName}
                onChange={onChangeLastName}
                data-style={lastNameError ? 'error' : ''}
                placeholder={
                  lastNameError ? '???????? ?????????????????????? ?????? ????????????????????!' : ''
                }
              ></input>
            </div>
            <div className={css.el}>
              <label htmlFor="date">???????? ????????????????</label>
              <input
                type={'date'}
                name="date"
                value={birthday}
                onChange={onChangeBirthday}
                data-style={dateError ? 'error' : ''}
                placeholder={
                  dateError ? '???????? ?????????????????????? ?????? ????????????????????!' : '????.????.????????'
                }
                disabled={editButton}
              ></input>
            </div>
            <div className={css.el}>
              <label>??????????</label>
              <DropDown
                valuesList={cities}
                startValue={account.cityOfResidence}
                canOpen={saveButton}
                clBack={onClickSetCity}
                needSearch={true}
              />
            </div>
            <div className={css.el}>
              <label>??????</label>
              <DropDown
                valuesList={['??????????????', '??????????????']}
                startValue={account.gender === 'male' ? '??????????????' : '??????????????'}
                canOpen={saveButton}
                clBack={onClickSetSex}
              />
            </div>
            <div className={css.el}>
              <label>????????????????</label>
              <DropDown
                valuesList={['????????', '??????']}
                startValue={account.hasPet ? '????????' : '??????'}
                canOpen={saveButton}
                clBack={onClickSetPet}
              />
            </div>
            <div className={css.el}>
              <label>?????????????? ????????????????????</label>
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
              <label>?? ????????</label>
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
                ?????????????????? ??????????????????
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
