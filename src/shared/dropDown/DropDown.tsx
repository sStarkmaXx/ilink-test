import { ChangeEvent, useState } from 'react';
import css from './DropDown.module.scss';
import drDown from './img/Arrow - Down 2.png';

type DropDownPropsType = {
  valuesList: string[];
  clBack?: (value: string) => void;
  startValue?: string;
  canOpen?: boolean;
  needSearch?: boolean;
};

export const DropDown: React.FC<DropDownPropsType> = ({
  valuesList,
  clBack,
  startValue,
  canOpen,
  needSearch,
}) => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [value, setValue] = useState<string>(startValue ? startValue : '');

  const showDropDown = () => {
    if (canOpen) setOpenDropDown(!openDropDown);
  };

  const closeDropDown = (value: string) => {
    setOpenDropDown(!openDropDown);
    setValue(value);
    clBack && clBack(value);
  };

  const [search, setSearch] = useState<string>('');

  const [filteredValues, setFilteredValues] =
    useState<Array<string>>(valuesList);

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setFilteredValues(
      [...valuesList].filter(
        (el) => el.toLowerCase().indexOf(e.currentTarget.value) === 0
      )
    );
  };

  const list = filteredValues.map((el) => (
    <div key={el} onClick={() => closeDropDown(el)} className={css.li}>
      {el}
    </div>
  ));

  return (
    <div className={css.dropdown}>
      <div className={css.window} onClick={showDropDown}>
        <p>{value}</p>

        <img src={drDown} alt="" />
      </div>
      {openDropDown && (
        <div className={css.ul}>
          {needSearch && (
            <>
              <input
                type="text"
                placeholder="Поиск города"
                value={search}
                onChange={onChangeSearch}
              />
              <div className={css.substrate}></div>
            </>
          )}
          {list}
        </div>
      )}
    </div>
  );
};
