import React from "react";
import DatePickerAntd from "./components/datepicker/DatePickerAntd";
import ValidateFromTo from "./components/input/ValidateFromTo";

function App() {
  return (
    <div className="container">
      <ValidateFromTo />
      <DatePickerAntd />
    </div>
  );
}

export default App;
