import locale from "antd/lib/date-picker/locale/ja_JP";
import moment from "moment";
import "moment/locale/ja";
import React from "react";
import DatePickerCustom from "./DatePickerCustom";

const DatePickerAntd = () => {
  moment.updateLocale("ja", {
    weekdaysMin: [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ],
  });

  //   disable date quas khu
  const disabledDate = (current: any) => {
    // Can not select days before today and today
    return current && current < moment().subtract(1, "day");
  };
  return (
    <div>
      <DatePickerCustom disabledDate={disabledDate} locale={locale} />
    </div>
  );
};

export default DatePickerAntd;
