import { FormikContext, useFormik } from "formik";
import React, { FC } from "react";

import { useAppDispatch, useUpdateEffect } from "@/hooks";

import { Modal } from "@/components/Modal";

import { actions } from "@/redux/utils";

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
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: InviteFormSchema) => {
    const { email, departments } = values;

    const request: ISendSurveyorInvitationRequest["body"] = {
      surveyorDetails: [
        {
          email,
          department: JSON.stringify(departments),
        },
      ],
    };

    const { success, message } = await sendSurveyorInvitationAPI(request);

    if (!success && message) {
      formikBag.resetForm();
      handleClose();

      dispatch(
        actions.callShowToast({
          open: true,
          type: "error",
          message,
        })
      );

      return;
    }

    if (success) {
      formikBag.resetForm();
      handleRefetch();
      handleClose();

      dispatch(
        actions.callShowToast({
          open: true,
          type: "success",
          message: "Successfully invited surveyor!",
        })
      );
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
      size="sm"
      scrollable={false}
      className="min-h-[25rem]"
    >
      <FormikContext.Provider value={formikBag}>
        <InviteContent />
      </FormikContext.Provider>
    </Modal>
  );
};

export { InviteForm };
