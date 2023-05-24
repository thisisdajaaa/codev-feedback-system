import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import { Input } from "@/components/Input";

export default {
  title: "Forms/Input",
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <Input placeholder="Enter text" {...args} />
);

const WithErrorInput: ComponentStory<typeof Input> = () => (
  <Input placeholder="Enter text" errorMessage="This is an error message" />
);

const WithMaskInput: ComponentStory<typeof Input> = () => (
  <Input placeholder="Enter text" mask="99/99" />
);

export const Default = Template.bind({});
Default.args = {};

export const WithError = WithErrorInput.bind({});
WithError.args = {};

export const WithMask = WithMaskInput.bind({});
WithMask.args = {};
