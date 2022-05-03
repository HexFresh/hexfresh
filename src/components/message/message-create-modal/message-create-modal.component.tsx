import { Button, Modal } from "antd";
import Search from "antd/lib/input/Search";
import React from "react";

export const MessageCreateModal = React.memo(({
  className,
  isOpenModal,
  onCancel,
  onSubmit,
  onSearchUser,
  loading,
}: {
  isOpenModal: boolean;
  onCancel: any;
  onSubmit: any;
  onSearchUser: any;
  loading: boolean;
  className?: string | undefined;
}) => {
  return <Modal
    title="Create new conversation"
    visible={isOpenModal}
    onOk={onSubmit}
    onCancel={onCancel}
    footer={[
      <Button key="back" onClick={onCancel}>
        Return
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
        Submit
      </Button>
    ]}
  >
    <Search
      className="mb-medium"
      placeholder="Search conversaiclatons"
      allowClear
      enterButton
      size="large"
      onSearch={onSearchUser}
    />
  </Modal>
});

MessageCreateModal.displayName = 'MessageCreateModal';