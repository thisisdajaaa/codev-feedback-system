import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import { CheckboxGroup } from "@/components/CheckboxGroup";

import { mockCheckboxGroupOptions } from "../config";
import type { Option } from "../types";

export default {
  title: "Forms/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {},
} as ComponentMeta<typeof CheckboxGroup>;

const Template: ComponentStory<typeof CheckboxGroup> = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleChange = (options: Option[]) => {
    setSelectedOptions(options);
  };

  return (
    <div>
      <CheckboxGroup
        options={mockCheckboxGroupOptions}
        selectedOptions={selectedOptions}
        onChange={handleChange}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
