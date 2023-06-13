import type { Option } from "@/components/Dropdown/types";

export type InviteFormSchema = {
  email: string;
  departments: Option[];
};

export type InviteFormProps = {
  open: boolean;
  handleClose: () => void;
  handleRefetch: () => void;
};
export type SurveyeeAddInfo = {
  email: string;
  isAdded: boolean;
};

export type SurveyInvitesModalProps = {
  open: boolean;
  templateId: string;
  setShowInviteDialog: (b: boolean) => void;
};
