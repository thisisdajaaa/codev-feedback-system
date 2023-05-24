import type { IUser } from "@/models/User/types";

import type { ApiResponse } from "@/types";

import type { PickedUserDetails } from "@/features/auth/types";

export type SingleUserResponse = Pick<IUser, PickedUserDetails> & {
  id: string;
};

export type UserResponse = SingleUserResponse[];

export type GetUsersResponse = Omit<ApiResponse<UserResponse>, "success">;
