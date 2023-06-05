import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import { DatePicker } from "@/components/DatePicker";

export default {
  title: "Forms/DatePicker",
  component: DatePicker,
  argTypes: {},
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker onChange={(value) => setDate(value)} selectedDate={date} />
  );
};

const WithErrorDatePicker: ComponentStory<typeof DatePicker> = () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      onChange={(value) => setDate(value)}
      selectedDate={date}
      errorMessage="Sample error message"
    />
  );
};

export const Default = Template.bind({});
Default.args = {};

export const WithError = WithErrorDatePicker.bind({});
WithError.args = {};
