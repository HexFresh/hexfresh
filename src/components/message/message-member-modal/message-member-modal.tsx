import { Avatar, Button, List, Modal, Select, Typography } from "antd";
import { isEmpty, map } from "lodash";
import { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { IRootStore } from "../../../store/store";
import { IQuickUser, IUser } from "../../../store/user/user-interface";

export const MessageMembersModal = memo((
  {
    users,
    onSubmit,
    onCancel,
    isOpen,
    isLoading,
    isAddMember = false
  }: {
    users: IUser[],
    onSubmit: any,
    onCancel: any,
    isLoading: boolean,
    isOpen: boolean,
    isAddMember: boolean
  }) => {
  const [ recipientIds, setRecipientIds ] = useState<string[]>([]);

  const handleSubmitForm = useCallback(() => {
    isAddMember&&!isEmpty(recipientIds) ? onSubmit(recipientIds) : onCancel();
  }, [ isAddMember, onCancel, onSubmit, recipientIds ]);

  function handleChange(value: any) {
    !isEmpty(value) && setRecipientIds(value);
  }

  const addMemberActions = useMemo(() => ([
    <Button key="back" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" loading={isLoading} onClick={handleSubmitForm}>
      Submit
    </Button>
  ]), [ handleSubmitForm, isLoading, onCancel ]);

  const viewMemberActions = useMemo(() => ([
    <Button key="back" onClick={onCancel}>
      Close
    </Button>
  ]), [ onCancel ])

  return <Modal
    title={isAddMember ? 'Add New Member' : 'View Members'}
    visible={isOpen}
    onOk={handleSubmitForm}
    onCancel={onCancel}
    footer={isAddMember ? addMemberActions : viewMemberActions}
  >
    <List
      bordered
      dataSource={users}
      renderItem={(item) => (
        <List.Item key={item.userId}>
          <Typography.Text mark></Typography.Text> {(item.lastName && item.firstName) ? `${item.lastName} ${item.firstName}` : item.username}
        </List.Item>
      )}
    />

    {isAddMember && <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Select your user"
      onChange={handleChange}
      optionLabelProp="label"
      className="mt-large-x2"
    >
      {!isEmpty(users) && map(users, userInfo => (<Select.Option value={userInfo.id} label={userInfo.username}>
        <div className="demo-option-label-item">
          <span role="img" aria-label="China" className="mv-small">
            <Avatar>{userInfo.username[ 0 ]}</Avatar>
          </span>
          {userInfo.username}
        </div>
      </Select.Option>))}

    </Select>}
  </Modal>
});

MessageMembersModal.displayName = 'MessageMembersModal';