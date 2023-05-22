import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import { Icon } from "@/components/Icon";
import { Typography } from "@/components/Typography";

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {},
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = () => (
  <div className="flex min-h-screen flex-col rounded-md bg-slate-400 p-4">
    <Typography variant="h2" size="text-lg" className="mb-2 font-bold">
      Icon / Default
    </Typography>

    <div className="flex gap-2">
      <Icon src="/assets/trash.svg" height={16} width={14} />
    </div>
  </div>
);

export const DefaultVariant = Template.bind({});
DefaultVariant.args = {};
