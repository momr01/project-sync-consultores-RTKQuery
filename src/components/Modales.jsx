import { Modal } from "antd";
import { ManageConsForm } from "./index";

const Modales = ({ isOpen, setIsOpen, add }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      centered
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      width={1000}
    >
      <ManageConsForm add={add} setIsOpen={closeModal} />
    </Modal>
  );
};

export default Modales;
