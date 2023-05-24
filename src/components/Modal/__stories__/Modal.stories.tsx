import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";

import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {},
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click Me</Button>
      <Modal
        title="Sample Modal"
        open={isOpen}
        handleClose={() => setIsOpen(false)}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt omnis
        accusamus magni alias velit quam vitae tempore, qui distinctio
        temporibus doloremque porro hic voluptas cum molestiae quidem? Illum aut
        dignissimos soluta id quaerat similique sit rerum, doloremque unde
        architecto expedita eveniet omnis temporibus reprehenderit facere at
        vitae voluptatum repudiandae nulla nobis provident. Ex repudiandae
        cupiditate at magnam maxime ab ratione optio obcaecati maiores quaerat,
        amet quod a tenetur provident illum et excepturi porro, incidunt sed
        molestias quae? Illum assumenda repellendus ea sint esse. Ex ducimus nam
        minus velit voluptatem. Hic fugiat accusamus, ad vero perferendis quis
        doloremque sequi, commodi aperiam soluta totam ratione quasi minus
        veritatis qui excepturi fuga! Velit tempora obcaecati vel, autem
        temporibus nam officia ipsam ullam eaque. Iusto, ullam aliquid
        blanditiis ipsam quo sunt, est harum velit non, corrupti ipsum eos unde
        voluptatibus. Est optio exercitationem veniam sequi perferendis aliquam
        illum consectetur praesentium necessitatibus, doloribus culpa officia
        aspernatur temporibus ipsum ea quas laudantium impedit? Quisquam vero
        quos doloremque impedit exercitationem optio omnis ducimus nihil laborum
        eaque dolorum molestiae blanditiis voluptate perspiciatis consequuntur
        doloribus minima, nobis cumque suscipit distinctio pariatur? Fugit error
        deserunt repellat odit ad, excepturi debitis repudiandae? Incidunt eos
        ab modi tempore vero quae corrupti in tenetur illum perferendis sunt
        consequatur impedit cum, culpa mollitia praesentium iusto at
        voluptatibus fuga ducimus quidem. Voluptatum veniam fugit eos libero
        error ratione voluptatibus quos! Vel officia perspiciatis ut autem earum
        soluta officiis. Consequatur fugiat aperiam unde cumque ullam id esse,
        sapiente sed. Illo esse quam itaque labore, doloribus impedit nobis
        placeat aut nemo possimus recusandae distinctio error quidem vel
        voluptatem corrupti consequatur aliquid omnis architecto unde
        consequuntur, nihil iusto doloremque pariatur! Impedit nostrum soluta at
        deserunt consequatur sapiente fugit voluptatibus esse, blanditiis atque.
        Expedita voluptatum aliquam voluptatem, illum commodi nihil maxime
        molestiae pariatur eligendi consequatur vero, neque corporis rerum odio.
        Asperiores amet explicabo distinctio voluptatem atque modi cumque, id
        fuga cupiditate placeat fugiat dolore, saepe labore exercitationem! Est,
        quibusdam! Debitis ipsa eveniet fugiat perspiciatis cumque id, minus
        provident veniam voluptatem hic? Nostrum architecto eligendi in sequi
        sunt voluptatibus, fugit velit, ullam soluta, nobis quo maiores rerum
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
