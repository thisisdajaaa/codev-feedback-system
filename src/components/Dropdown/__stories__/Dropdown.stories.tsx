import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import { Dropdown } from "@/components/Dropdown";
import { Typography } from "@/components/Typography";

import { mockDropdownOptions, mockGroupedDropdownOptions } from "../fixtures";
import type { Option } from "../types";

export default {
  title: "Forms/Dropdown",
  component: Dropdown,
  argTypes: {},
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = () => {
  const [selectedOption, setSelectedOption] = useState<
    Option | Option[] | null
  >(null);

  const handleOptionChange = (selectedOptions: Option | Option[]) => {
    setSelectedOption(selectedOptions);
  };

  return (
    <div>
      <Dropdown
        options={mockDropdownOptions}
        selectedOption={selectedOption as Option[]}
        placeholder="Select an option"
        onChange={handleOptionChange}
      />

      <Typography variant="p" className="mt-2">
        {JSON.stringify(selectedOption)}
      </Typography>
    </div>
  );
};

const MultiSelectDropdown: ComponentStory<typeof Dropdown> = () => {
  const [selectedOption, setSelectedOption] = useState<
    Option | Option[] | null
  >(null);

  const handleOptionChange = (selectedOptions: Option | Option[]) => {
    setSelectedOption(selectedOptions);
  };

  return (
    <div>
      <Dropdown
        options={mockDropdownOptions}
        selectedOption={selectedOption}
        placeholder="Select an option"
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
  const [selectedOption, setSelectedOption] = useState<
    Option | Option[] | null
  >(null);

  const handleOptionChange = (selectedOptions: Option | Option[]) => {
    setSelectedOption(selectedOptions);
  };

  return (
    <div>
      <Dropdown
        selectedOption={selectedOption}
        options={mockDropdownOptions}
        placeholder="Select an option"
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

const GroupedOptionsDropdown: ComponentStory<typeof Dropdown> = () => {
  const [selectedOption, setSelectedOption] = useState<
    Option | Option[] | null
  >(null);

  const handleOptionChange = (selectedOptions: Option | Option[]) => {
    setSelectedOption(selectedOptions);
  };

  return (
    <div>
      <Dropdown
        selectedOption={selectedOption}
        options={mockGroupedDropdownOptions}
        placeholder="Select an option"
        onChange={handleOptionChange}
      />

      <Typography variant="p" className="mt-2">
        {JSON.stringify(selectedOption)}
      </Typography>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const GroupedOptions = GroupedOptionsDropdown.bind({});
GroupedOptions.args = {};

export const MultiSelect = MultiSelectDropdown.bind({});
MultiSelect.args = {};

export const WithError = WithErrorDropdown.bind({});
WithError.args = {};
