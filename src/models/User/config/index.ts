export enum ROLES {
  ADMIN = "ADMIN",
  SURVEYOR = "SURVEYOR",
  SURVEYEE = "SURVEYEE",
}

export const roleList = Object.values(ROLES);

export const ROLE_HIERARCHY = {
  [ROLES.ADMIN]: 3,
  [ROLES.SURVEYOR]: 2,
  [ROLES.SURVEYEE]: 1,
};
