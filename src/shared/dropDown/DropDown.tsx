import { useState } from 'react';
import css from './DropDown.module.scss';
import drDown from './img/Arrow - Down 2.png';

type DropDownPropsType = {
  valuesList: string[];
  clBack?: (value: string) => void;
  startValue?: string;
  canOpen?: boolean;
};

export const DropDown: React.FC<DropDownPropsType> = ({
  valuesList,
  clBack,
  startValue,
  canOpen,
}) => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [value, setValue] = useState<string>(startValue ? startValue : '');

  const showDropDown = () => {
    if (canOpen) setOpenDropDown(true);
  };

  const closeDropDown = (value: string) => {
    setOpenDropDown(false);
    setValue(value);
    clBack && clBack(value);
  };

  const list = valuesList.map((el) => (
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
      <div className={css.ul}>{openDropDown && list}</div>
    </div>
  );
};
