import { InputNumber } from "antd";
import { get } from "lodash";
import React, { useMemo } from "react";

const MAX_LENGTH_NUMBER_INPUT = 10;

const InputNumberCustom = ({ isDecimal, isConvertCurrency, roundDecimal, maxLength, ...otherProps }: any) => {
  const maxLengthMemo = useMemo(() => maxLength || MAX_LENGTH_NUMBER_INPUT, []);

  const onKeyDown = (e: any) => {
    const key = e.which || e.keyCode; // keyCode detection
    if (key === 8 || key === 46) {
      // backspace, delete
      return;
    }
    const ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false; // ctrl detection
    if (key == 86 && ctrl) {
      // Ctrl + V
      return;
    } else if (key == 67 && ctrl) {
      // Ctrl + C
      return;
    } else if (key == 65 && ctrl) {
      // Ctrl + A
      return;
    }

    if ((get(e, "target.value", "").replaceAll(",", "") + "").length >= maxLengthMemo) {
      e.preventDefault();
      return;
    }
    if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
      // 0-9 only
      return;
    }
    if (isDecimal && (key === 110 || key === 190)) {
      // dot
      return;
    }
    e.preventDefault();
  };

  return (
    <InputNumber
      {...otherProps}
      onChange={(e) => otherProps.onChange(e ? `${e}`.substring(0, maxLengthMemo) : "")}
      formatter={(v) => (isConvertCurrency ? `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : v)}
      parser={(v) => v?.replace(/\$\s?|(,*)/g, "")}
      autoComplete="off"
      onKeyDown={onKeyDown}
      className={`${otherProps.className || ""} input-number`}
    />
  );
};

export default InputNumberCustom;
