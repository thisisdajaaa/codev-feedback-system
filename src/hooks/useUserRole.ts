import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { ROLES } from "@/models/User/config";

const useUserRole = () => {
  const { data } = useSession();

  const roles = useMemo(() => {
    const isAdmin = data?.user?.role === ROLES.ADMIN;
    const isSurveyor = data?.user?.role === ROLES.SURVEYOR;
    const isSurveyee = data?.user?.role === ROLES.SURVEYEE;

    return {
      isAdmin,
      isSurveyor,
      isSurveyee,
    };
  }, [data?.user?.role]);

  return { ...roles };
};

export default useUserRole;
