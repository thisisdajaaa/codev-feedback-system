import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Table } from "@/components/Table";

import { TableVariations } from "../config";

export default {
  title: "Components/Table",
  component: Table,
  argTypes: {},
} as ComponentMeta<typeof Table>;

const PrimaryTable: ComponentStory<typeof Table> = () => {
  const data = [
    { id: "1", name: "Item 1", price: "$20" },
    { id: "2", name: "Item 2", price: "$30" },
    { id: "3", name: "Item 3", price: "$40" },
    { id: "4", name: "Item 3", price: "$40" },
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

const SecondaryTable: ComponentStory<typeof Table> = () => {
  const columns = [
    { key: "id", title: "ID", style: "w-1/6" },
    { key: "name", title: "Name", style: "w-2/6" },
    { key: "email", title: "Email", style: "w-2/6" },
    { key: "role", title: "Role", style: "w-1/6" },
  ];

  const data = [
    { id: "1", name: "John Doe", email: "john.doe@example.com", role: "Admin" },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "User",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "User",
    },
  ];

  return (
    <div>
      <Table
        variation={TableVariations.Secondary}
        title="Sample Title"
        data={data}
        columns={columns}
      />
    </div>
  );
};

export const Primary = PrimaryTable.bind({});
Primary.args = {};

export const Secondary = SecondaryTable.bind({});
Secondary.args = {};
