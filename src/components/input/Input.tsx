import React from "react";
import styles from "./input.module.css";
import debounce from "lodash.debounce";

type props = {
  inputValue: string;
  setInputValue: any;
};

const Input: React.FC<props> = ({ inputValue, setInputValue }) => {
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
    <div>
      <input
        ref={inputRef}
        className={styles.input}
        onChange={onChangeInput}
        type="text"
        placeholder="Введите название..."
        value={inputValue}
      />
    </div>
  );
};

export default Input;
