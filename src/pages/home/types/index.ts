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
