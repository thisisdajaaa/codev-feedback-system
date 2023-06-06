import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import { Checkbox } from "@/components/Checkbox";

export default {
  title: "Forms/Checkbox",
  component: Checkbox,
  argTypes: {},
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = () => {
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <Checkbox
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      label="Sample"
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
