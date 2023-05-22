import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import { Input } from "@/components/Input";

export default {
  title: "Forms/Input",
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {};
