import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import { Dropdown } from "@/components/Dropdown";
import { Typography } from "@/components/Typography";

import { mockDropdownOptions } from "../fixtures";
import type { Option } from "../types";

export default {
  title: "Forms/Dropdown",
  component: Dropdown,
  argTypes: {},
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = () => {
  const [selectedOption, setSelectedOption] = useState<Option | Option[]>();

  const handleOptionChange = (selectedOptions: Option | Option[]) => {
    setSelectedOption(selectedOptions);
  };

  return (
    <div>
      <Dropdown
        options={mockDropdownOptions}
        placeholder="Select an option"
        name="dropdown"
        onChange={handleOptionChange}
      />

      <Typography variant="p" className="mt-2">
        {JSON.stringify(selectedOption)}
      </Typography>
    </div>
  );
};

const MultiSelectDropdown: ComponentStory<typeof Dropdown> = () => {
  const [selectedOption, setSelectedOption] = useState<Option | Option[]>();

  const handleOptionChange = (selectedOptions: Option | Option[]) => {
    setSelectedOption(selectedOptions);
  };

  return (
    <div>
      <Dropdown
        options={mockDropdownOptions}
        placeholder="Select an option"
        name="dropdown"
        onChange={handleOptionChange}
        multiSelect
      />

      <Typography variant="p" className="mt-2">
        {JSON.stringify(selectedOption)}
      </Typography>
    </div>
  );
};

const WithErrorDropdown: ComponentStory<typeof Dropdown> = () => {
  const [selectedOption, setSelectedOption] = useState<Option | Option[]>();

  const handleOptionChange = (selectedOptions: Option | Option[]) => {
    setSelectedOption(selectedOptions);
  };

  return (
    <div>
      <Dropdown
        options={mockDropdownOptions}
        placeholder="Select an option"
        name="dropdown"
        onChange={handleOptionChange}
        multiSelect
        errorMessage="This is an error message"
      />

      <Typography variant="p" className="mt-2">
        {JSON.stringify(selectedOption)}
      </Typography>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const MultiSelect = MultiSelectDropdown.bind({});
MultiSelect.args = {};

export const WithError = WithErrorDropdown.bind({});
WithError.args = {};
