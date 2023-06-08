import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";

import { Rating } from "@/components/Rating";

export default {
  title: "Forms/Rating",
  component: Rating,
  argTypes: {},
} as ComponentMeta<typeof Rating>;

const Template: ComponentStory<typeof Rating> = () => {
  const [rating, setRating] = useState<number>(0);

  return (
    <div>
      <h1>Rating Component:</h1>
      <Rating value={rating} onChange={setRating} />
      <p>Selected rating: {rating}</p>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
