import type { IUser } from "@/models/User/types";

import type { ApiResponse } from "@/types";

import type { PickedUserDetails } from "@/features/auth/types";

export type SingleUserResponse = Pick<IUser, PickedUserDetails> & {
  id: string;
};
export type SingleUserListResponse = Pick<IUser, PickedUserDetails> & {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type UserResponse = SingleUserResponse[];

export type UserListResponse = SingleUserListResponse[];

export type GetUsersResponse = Omit<ApiResponse<UserResponse>, "success">;
