import clsx from "clsx";
import { useFormikContext } from "formik";
import React from "react";

import { useFieldError } from "@/hooks";

import { Button } from "@/components/Button";
import { FormDropdown } from "@/components/Formik/FormDropdown";
import { FormInput } from "@/components/Formik/FormInput";
import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";

import { mockDepartments } from "../fixtures";
import type { InviteFormSchema } from "../types";

const InviteContent = () => {
  const { submitForm, isSubmitting } = useFormikContext<InviteFormSchema>();

  const { hasError } = useFieldError("email");

  const renderBtnSubmit = (
    <Button
      onClick={submitForm}
      isLoading={isSubmitting}
      className="flex w-full items-center justify-center"
    >
      <div className="text-[1.313rem]">
        <Icon src="/assets/mail.svg" />
      </div>

      <Typography
        variant="span"
        size="text-lg"
        lineHeight="leading-[1.688rem]"
        textAlign="text-left"
        color="text-white"
        className="font-semibold"
      >
        Send
      </Typography>
    </Button>
  );

  return (
    <div className="px-4 xl:px-[6.438rem]">
      <Typography
        variant="h3"
        size="text-xl"
        lineHeight="leading-[1.688rem]"
        textAlign="text-left"
        className="mb-[1.063rem] font-normal lg:mb-[3.063rem]"
      >
        Send an Invite
      </Typography>

      <div className="mb-5 flex flex-col items-start lg:flex-row lg:items-center lg:gap-[1.313rem]">
        <div className="flex w-full flex-col">
          <Typography variant="p" className="mb-[0.375rem] md:mb-3">
            Email
          </Typography>

          <div className="flex items-center justify-between gap-[1.188rem]">
            <div className="flex w-full flex-col">
              <FormInput name="email" placeholder="Enter email" />
            </div>

            <div
              className={clsx(
                "hidden lg:block",
                hasError && "lg:relative lg:-top-[0.125rem] lg:self-start"
              )}
            >
              {renderBtnSubmit}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <Typography variant="p" className="mb-[0.375rem] md:mb-3">
          Department
        </Typography>

        <FormDropdown
          name="departments"
          options={mockDepartments}
          multiSelect
          placeholder="Select department"
        />
      </div>

      <div className="mt-6 block w-full lg:hidden">{renderBtnSubmit}</div>
    </div>
  );
};

export default InviteContent;
