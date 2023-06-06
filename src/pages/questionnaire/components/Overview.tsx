import React, { FC } from "react";

import { FormDatePicker } from "@/components/Formik/FormDatePicker/FormDatePicker";
import { FormInput } from "@/components/Formik/FormInput";
import { FormTextArea } from "@/components/Formik/FormTextArea";
import { InputVariations } from "@/components/Input/config";
import { Typography } from "@/components/Typography";

const Overview: FC = () => {
  return (
    <div className="mt-12 rounded-lg border-t-8 border-zinc-500 bg-white px-8 py-[26px] shadow-md">
      <FormInput
        name="title"
        placeholder="Untitled Survey"
        variation={InputVariations.NoBorder}
        containerClassName="p-0 mb-[11px]"
        inputClassName="text-[32px] font-bold placeholder:font-bold p-0"
      />

      <div className="mb-[17px] flex flex-col gap-[6px] md:flex-row">
        <Typography variant="label" className="mt-2 font-bold">
          Description:
        </Typography>

        <FormTextArea
          name="description"
          placeholder="Enter your description here..."
          rows={3}
        />
      </div>

      <div className="flex flex-col justify-start gap-[10px] md:flex-row md:items-center md:gap-[30px]">
        <Typography variant="label" className="font-bold">
          Duration:
        </Typography>

        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <Typography variant="label" className="mr-1">
              From
            </Typography>

            <FormDatePicker name="dateFrom" />
          </div>

          <div className="flex flex-col gap-1 md:flex-row md:items-center">
            <Typography variant="label" className="mr-1">
              To
            </Typography>

            <FormDatePicker name="dateTo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Overview };
