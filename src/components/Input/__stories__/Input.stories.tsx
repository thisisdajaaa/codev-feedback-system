import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import { Icon } from "@/components/Icon";
import { Input } from "@/components/Input";

import { InputVariations } from "../config";

export default {
  title: "Forms/Input",
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const InputOutlined: ComponentStory<typeof Input> = (args) => (
  <Input placeholder="Enter text" {...args} />
);

const InputRightAdornment: ComponentStory<typeof Input> = (args) => (
  <Input
    placeholder="Enter text"
    rightAdornment={<Icon src="/assets/edit.svg" />}
    {...args}
  />
);

const InputNoBorder: ComponentStory<typeof Input> = (args) => (
  <Input
    placeholder="Enter text"
    variation={InputVariations.NoBorder}
    {...args}
  />
);

const InputSolid: ComponentStory<typeof Input> = (args) => (
  <Input placeholder="Enter text" variation={InputVariations.Solid} {...args} />
);

const InputBrokenLine: ComponentStory<typeof Input> = (args) => (
  <Input
    placeholder="Enter text"
    variation={InputVariations.BrokenLineBorder}
    {...args}
  />
);

const InputUnderlined: ComponentStory<typeof Input> = (args) => (
  <Input
    placeholder="Enter text"
    variation={InputVariations.Underlined}
    {...args}
  />
);

const WithErrorInput: ComponentStory<typeof Input> = () => (
  <Input placeholder="Enter text" errorMessage="This is an error message" />
);

const WithMaskInput: ComponentStory<typeof Input> = () => (
  <Input placeholder="Enter text" mask="99/99" />
);

export const Outlined = InputOutlined.bind({});
Outlined.args = {};

export const NoBorder = InputNoBorder.bind({});
NoBorder.args = {};

export const Solid = InputSolid.bind({});
Solid.args = {};

export const BrokenLine = InputBrokenLine.bind({});
BrokenLine.args = {};

export const Underlined = InputUnderlined.bind({});
Underlined.args = {};

export const WithError = WithErrorInput.bind({});
WithError.args = {};

export const WithRightAdornment = InputRightAdornment.bind({});
NoBorder.args = {};

export const WithMask = WithMaskInput.bind({});
WithMask.args = {};
