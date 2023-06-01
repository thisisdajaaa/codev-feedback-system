import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import { PieChart } from "@/components/PieChart";

export default {
  title: "Components/PieChart",
  component: PieChart,
  argTypes: {},
} as ComponentMeta<typeof PieChart>;

const Template: ComponentStory<typeof PieChart> = (args) => {
  return (
    <div className="flex items-center justify-center">
      <PieChart {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  questionName: "What is your satisfaction scale for this project?",
  data: [
    {
      value: "Very dissatisfied",
      answers: "20%",
    },
    {
      value: "Dissatisfied",
      answers: "20%",
    },
    {
      value: "Neither",
      answers: "20%",
    },
    {
      value: "Satisfied",
      answers: "20%",
    },
    {
      value: "Very satisfied",
      answers: "20%",
    },
  ],
};
