import type { IUser } from "@/models/User/types";

import type { PickedUserDetails } from "@/features/auth/types";

export type UserResponse = (Pick<IUser, PickedUserDetails> & { id: string })[];
