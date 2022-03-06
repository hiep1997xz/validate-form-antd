import { DatePicker } from "antd";
import { get } from "lodash";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const DatePickerCustom = ({ ...otherProps }) => {

  const [disable,setDisable] = useState(otherProps.disable);
  const datePickerRef = useRef<any>(null);

  useEffect(() => {
    setDisable(otherProps.disable);
  },[otherProps.disable])
  
  useEffect(() => {
    const changeData = (input: any) => {
      if (!input) {
        return;
      }

      const value = input.value;
      if (otherProps.picker === "month" && value?.length === 6) {
        const valueParser = moment(value, "YYYYMM");
        if (otherProps.disabledDate && otherProps.disabledDate(valueParser)) {
          otherProps.onChange && otherProps.onChange(null);
          return;
        }
        if (valueParser.isValid()) {
          otherProps.onChange && otherProps.onChange(valueParser);
          input.blur();
        } else {
          otherProps.onChange && otherProps.onChange(null);
        }
      } else if (!["year", "month"].includes(otherProps.picker) && value?.length === 8) {
        const valueParser = moment(value, "YYYYMMDD");
        if (otherProps.disabledDate && otherProps.disabledDate(valueParser)) {
          otherProps.onChange && otherProps.onChange(null);
          return;
        }
        if (valueParser.isValid()) {
          otherProps.onChange && otherProps.onChange(valueParser);
          input.blur();
        } else {
          otherProps.onChange && otherProps.onChange(null);
        }
      }
    };

    const clearInput = (input: any, event: any) => {
      if (event.key === "Backspace" || event?.key === "Delete") {
        otherProps.onChange && otherProps.onChange(null);
        input.value = "";
        event.preventDefault();
      }
    };

    if (datePickerRef.current) {
      const input = get(datePickerRef.current, "children[0].children[0].children[0]");
      datePickerRef.current.addEventListener("keyup", () => changeData(input));
      datePickerRef.current.addEventListener("keydown", (event: any) => clearInput(input, event));
    }
    return () => {
      if (datePickerRef.current) {
        datePickerRef.current.removeEventListener("keyup", changeData);
        datePickerRef.current.removeEventListener("keydown", clearInput);
      }
    };
  }, [datePickerRef.current]);

  return (
    <div ref={datePickerRef} className={otherProps.className}>
      <DatePicker {...otherProps} disabled={disable} />
    </div>
  );
};
export default DatePickerCustom;
