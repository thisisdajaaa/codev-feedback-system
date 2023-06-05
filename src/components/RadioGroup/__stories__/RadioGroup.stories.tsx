import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import { RadioGroup } from "@/components/RadioGroup";

import { mockRadioGroupOptions } from "../config";
import type { Option } from "../types";

export default {
  title: "Forms/RadioGroup",
  component: RadioGroup,
  argTypes: {},
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  return (
    <div>
      <RadioGroup
        options={mockRadioGroupOptions}
        selectedOption={selectedOption}
        onChange={setSelectedOption}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
