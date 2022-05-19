import { Avatar, Button, Input, Modal, Select } from "antd";
import { isEmpty, map } from "lodash";
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { IRootStore } from "../../../store/store";
import { IQuickUser } from "../../../store/user/user-interface";

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

  const userList = useSelector((state: IRootStore) => state.user?.users) as IQuickUser[];
  const [ recipientIds, setRecipientIds ] = useState<string[]>([]);
  const [ title, setTitle ] = useState<string>('');

  function handleChange(value: any) {
    !isEmpty(value) && setRecipientIds(value);
  }

  const onChangeTitle = (event: any) => {
    const { value } = event.target
    !isEmpty(value) && setTitle(value);
  }

  const handleSubmitForm = useCallback(()=>{
    onSubmit(recipientIds, title);
  },[onSubmit, recipientIds, title])
  
  return <Modal
    title="Create new conversation"
    visible={isOpenModal}
    onOk={handleSubmitForm}
    onCancel={onCancel}
    footer={[
      <Button key="back" onClick={onCancel}>
        Return
      </Button>,
      <Button key="submit" type="primary" loading={loading} onClick={handleSubmitForm}>
        Submit
      </Button>
    ]}
  >
    <Input placeholder="Input your conversation title here." value={title} onChange={onChangeTitle}  className="mh-medium"/>
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Select your user"
      onChange={handleChange}
      optionLabelProp="label"
    >
      {!isEmpty(userList) && map(userList, userInfo => (<Select.Option value={userInfo.id} label={userInfo.username}>
        <div className="demo-option-label-item">
          <span role="img" aria-label="China" className="mv-small">
            <Avatar>{userInfo.username[ 0 ]}</Avatar>
          </span>
          {userInfo.username}
        </div>
      </Select.Option>))}

    </Select>
  </Modal>
});

MessageCreateModal.displayName = 'MessageCreateModal';