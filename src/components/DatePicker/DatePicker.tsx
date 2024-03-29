import React, { FC } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import type { DatePickerProps } from "./types";
import { Icon } from "../Icon";
import { Solid as InputSolid } from "../Input/Solid";

const DatePicker: FC<DatePickerProps> = (props) => {
  const { selectedDate, onBlur, onChange, readOnly, errorMessage } = props;

  return (
    <>
      <ReactDatePicker
        selected={selectedDate}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        minDate={new Date()}
        placeholderText="mm/dd/yyyy"
        className="w-full border-none bg-transparent p-0 focus:border-transparent focus:outline-none focus:ring-0"
        customInput={
          <InputSolid
            type="text"
            mask="99/99/9999"
            rightAdornment={
              <div className="text-2xl">
                <Icon src="/assets/calendar.svg" />
              </div>
            }
            errorMessage={errorMessage}
            inputClassName="bg-transparent"
          />
        }
      />
    </>
  );
};

export { DatePicker };
