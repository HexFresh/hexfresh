import { Avatar, Button, List, Modal, Select, Typography } from "antd";
import { isEmpty, map } from "lodash";
import { memo, useCallback, useState } from "react";

export const MessageMembersModal = memo((
  {
    users,
    onSubmit,
    onCancel,
    isOpen,
    isLoading,
    isAddMember = false
  }: {
    users?: any,
    onSubmit: any,
    onCancel: any,
    isLoading: boolean,
    isOpen: boolean,
    isAddMember: boolean
  }) => {

  const [ recipientIds, setRecipientIds ] = useState<string[]>([]);
  const handleSubmitForm = useCallback(() => {

  }, []);

  function handleChange(value: any) {
    !isEmpty(value) && setRecipientIds(value);
  }

  return <Modal
    title={isAddMember ? 'Add New Member' : 'View Members'}
    visible={isOpen}
    onOk={handleSubmitForm}
    onCancel={onCancel}
    footer={[
      <Button key="back" onClick={onCancel}>
        Return
      </Button>,
      <Button key="submit" type="primary" loading={isLoading} onClick={handleSubmitForm}>
        Submit
      </Button>
    ]}
  >
    <List
      bordered
      dataSource={users}
      renderItem={(item) => (
        <List.Item>
          <Typography.Text mark>[ITEM]</Typography.Text> {item}
        </List.Item>
      )}
    />

    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Select your user"
      onChange={handleChange}
      optionLabelProp="label"
    >
      {!isEmpty(users) && map(users, userInfo => (<Select.Option value={userInfo.id} label={userInfo.username}>
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

MessageMembersModal.displayName = 'MessageMembersModal';