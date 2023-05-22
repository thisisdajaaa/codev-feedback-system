import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Table } from "@/components/Table";

export default {
  title: "Components/Table",
  component: Table,
  argTypes: {},
} as ComponentMeta<typeof Table>;

const PrimaryTable: ComponentStory<typeof Table> = () => {
  const data = [
    { id: 1, name: "Item 1", price: "$20" },
    { id: 2, name: "Item 2", price: "$30" },
    { id: 3, name: "Item 3", price: "$40" },
    { id: 4, name: "Item 3", price: "$40" },
  ];

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "price", title: "Price" },
  ];

  return (
    <div>
      <Table title="Sample Title" data={data} columns={columns} />
    </div>
  );
};

export const Primary = PrimaryTable.bind({});
Primary.args = {};
