import React, { FC } from "react";

import { FormInput } from "@/components/Formik/FormInput";
import { InputVariations } from "@/components/Input/config";

import type { QuestionProps } from "../types";

const Question: FC<QuestionProps> = (props) => {
  const { index } = props;

  return (
    <div className="rounded-lg border-l-8 border-blue-500 bg-white px-8 py-[26px] shadow-md">
      <div className="flex">
        <FormInput
          name={`questions.${index}.title`}
          placeholder="Enter your question here"
          variation={InputVariations.Solid}
        />
      </div>
    </div>
  );
};

export { Question };
