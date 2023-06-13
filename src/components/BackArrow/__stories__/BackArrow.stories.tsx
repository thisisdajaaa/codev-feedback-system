import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import { BackArrow } from "@/components/BackArrow";

export default {
  title: "Components/BackArrow",
  component: BackArrow,
  argTypes: {},
} as ComponentMeta<typeof BackArrow>;

const Template: ComponentStory<typeof BackArrow> = (args) => (
  <BackArrow {...args} />
);

export const Default = Template.bind({});
Default.args = {};
