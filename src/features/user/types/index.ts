import { IUser } from "@/models/User/types";

import { PickedUserDetails } from "@/features/auth/types";

export type UserResponse = (Pick<IUser, PickedUserDetails> & { id: string })[];
