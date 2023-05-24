import { ComponentMeta, ComponentStory } from "@storybook/react";
import clsx from "clsx";
import React, { useState } from "react";

import { AlertBanner } from "@/components/AlertBanner";
import { Button } from "@/components/Button";

export default {
  title: "Components/AlertBanner",
  component: AlertBanner,
  argTypes: {},
} as ComponentMeta<typeof AlertBanner>;

const Template: ComponentStory<typeof AlertBanner> = (args) => {
  const [showBanner, setShowBanner] = useState<boolean>(true);

  return (
    <>
      <AlertBanner
        {...args}
        open={showBanner}
        handleClose={() => setShowBanner(false)}
        message="This is a sample message"
      />

      <Button
        className={clsx(showBanner && "mt-2")}
        onClick={() => setShowBanner(true)}
      >
        Click Me
      </Button>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
