import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import Button from "@/components/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    // override React.ReactNode type with this
    // children: {
    // control: { type: 'text' },
    // },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Click me</Button>
);

export const Default = Template.bind({});
Default.args = {};
