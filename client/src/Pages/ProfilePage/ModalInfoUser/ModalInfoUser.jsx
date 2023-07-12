import { Modal } from "antd";
import { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import InfoUser from "./InfoUser";

const ModalInfoUser = () => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const formikRef = useRef();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    formikRef.current.submitForm();
  };

  const handleCancel = () => {
    setOpen(false);
    formikRef.current.resetForm();
  };

  const enableOk = (value) => {
    setDisabled(value);
  };

  return (
    <div>
      <button className="profile-info__btn" onClick={showModal}>
        <FaPen />
        <span className="ml-4">Chỉnh sửa thông tin</span>
      </button>

      <Modal
        title="Thông tin cá nhân"
        open={open}
        okText="Cập nhật"
        cancelText="Hủy"
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled }}
      >
        <InfoUser
          ref={formikRef}
          handleCancel={handleCancel}
          enableOk={enableOk}
        />
      </Modal>
    </div>
  );
};
export default ModalInfoUser;
