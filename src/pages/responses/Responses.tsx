import React from "react";

import { withAuth } from "@/utils/withAuth";

const Responses = () => {
  return (
    <div className="m-auto flex max-w-screen-2xl flex-col py-2 sm:py-[1.125rem] sm:px-[2rem]">
      Responses
    </div>
  );
};

export default withAuth(Responses);
