import { NextPage } from "next";
import React from "react";

import clsxm from "@/utils/clsxm";
import { withAuth } from "@/utils/withAuth";

import { Input } from "@/components/Input";

const Questionnaire: NextPage = () => {
  return (
    <div>
      <div className="container mx-auto mt-12 rounded-lg border-t-8 border-zinc-500 bg-white p-8 shadow-md">
        <Input
          placeholder="Title"
          containerClassName="block w-full border-transparent border-none"
          inputClassName={clsxm(
            "text-2xl leading-[1.813rem] text-black placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0"
          )}
        />
      </div>
    </div>
  );
};

export default withAuth(Questionnaire);
