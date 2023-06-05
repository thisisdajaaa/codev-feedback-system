import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import { TextArea } from "@/components/TextArea";

export default {
  title: "Forms/TextArea",
  component: TextArea,
  argTypes: {},
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea placeholder="Paragraph text field" {...args} />
);

export const Default = Template.bind({});
Default.args = {};
