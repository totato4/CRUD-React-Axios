import React, { ReactNode } from "react";
import styles from "./input.module.css";
import debounce from "lodash.debounce";
import Button from "./../button/Button";

type props = {
  inputValue: string;
  setInputValue: any;
  children?: ReactNode;
};

const Input: React.FC<props> = ({ inputValue, setInputValue, children }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState("");

  const onClickClear = (e: React.MouseEvent<SVGSVGElement>) => {
    console.log(e);
    setInputValue("");
    inputRef.current?.focus();
  };
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      setInputValue(str);
    }, 1000),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchValue(event.target.value);
    setInputValue(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        className={styles.input}
        onChange={onChangeInput}
        type="text"
        placeholder="Введите название..."
        value={inputValue}
      />
      {children}
    </div>
  );
};

export default Input;
