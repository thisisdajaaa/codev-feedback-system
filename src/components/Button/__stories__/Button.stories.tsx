import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import logger from "@/utils/logger";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Click me</Button>
);

const WithIconButton: ComponentStory<typeof Button> = () => (
  <Button
    onClick={() => logger("clicked")}
    variant="warning"
    className="xs:px-[0.7rem]"
  >
    <Icon src="/assets/trash.svg" height={16} width={14} />
    <span className="hidden sm:inline">Trash</span>
  </Button>
);

export const Default = Template.bind({});
Default.args = {};

export const WithIcon = WithIconButton.bind({});
WithIcon.args = {};
