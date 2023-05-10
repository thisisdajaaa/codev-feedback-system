import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import Loading from "@/components/Loading";

export default {
  title: "Components/Loading",
  component: Loading,
  argTypes: {},
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const Default = Template.bind({});
Default.args = {
  fullscreen: true,
};
