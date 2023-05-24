import { FormikContext, useFormik } from "formik";
import React, { FC, useState } from "react";

import { useUpdateEffect } from "@/hooks";

import { AlertBanner } from "@/components/AlertBanner";
import { Modal } from "@/components/Modal";

import { sendSurveyorInvitationAPI } from "@/api/auth";
import type { ISendSurveyorInvitationRequest } from "@/features/auth/types";

import InviteContent from "./InviteContent";
import type { InviteFormProps, InviteFormSchema } from "../types";
import { inviteFormSchema } from "../validations/inviteFormSchema";

const InviteForm: FC<InviteFormProps> = ({
  open,
  handleClose,
  handleRefetch,
}) => {
  const [serverErrorMesage, setServerErrorMessage] = useState<
    string | undefined
  >(undefined);

  const handleSubmit = async (values: InviteFormSchema) => {
    const { email, departments } = values;

    setServerErrorMessage(undefined);

    const request: ISendSurveyorInvitationRequest["body"] = {
      surveyorDetails: [
        {
          email,
          department: JSON.stringify(departments),
        },
      ],
    };

    const { success, message } = await sendSurveyorInvitationAPI(request);

    if (!success) setServerErrorMessage(message);

    if (success) {
      formikBag.resetForm();
      handleRefetch();
      handleClose();
    }
  };

  const formikBag = useFormik<InviteFormSchema>({
    enableReinitialize: true,
    initialValues: { email: "", departments: [] },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: inviteFormSchema,
    onSubmit: handleSubmit,
  });

  useUpdateEffect(() => {
    if (open) formikBag.resetForm();
  }, [open]);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      size="lg"
      scrollable={false}
      className="min-h-[25rem]"
    >
      <FormikContext.Provider value={formikBag}>
        <AlertBanner
          open={!!serverErrorMesage}
          message={serverErrorMesage}
          className="mb-4"
          type="error"
          handleClose={() => setServerErrorMessage(undefined)}
        />
        <InviteContent />
      </FormikContext.Provider>
    </Modal>
  );
};

export { InviteForm };
