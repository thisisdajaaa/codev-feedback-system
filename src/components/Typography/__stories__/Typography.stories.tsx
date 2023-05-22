import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import { Typography } from "@/components/Typography";

export default {
  title: "Contents/Typography",
  component: Typography,
  argTypes: {},
} as ComponentMeta<typeof Typography>;

const TypographyDefault: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args} />
);

const TypographyCustom: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args} />
);

export const Default = TypographyDefault.bind({});
Default.args = {
  preset: "subheading",
  children: "Text is in here",
};

export const Custom = TypographyCustom.bind({});
Custom.args = {
  color: "text-slate-700",
  variant: "h4",
  size: "text-base",
  className: "font-bold",
  children: "Text is in here",
};
