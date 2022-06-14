import { Avatar, Button, List, Modal, Select, Typography } from "antd";
import { isEmpty, map } from "lodash";
import { userInfo } from "os";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
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
  const userList = useSelector((state: IRootStore) => state.user.users) as IQuickUser[];
  const [ recipientIds, setRecipientIds ] = useState<string[]>([]);

  const handleSubmitForm = useCallback(() => {
    isAddMember && !isEmpty(recipientIds) ? onSubmit(recipientIds) : onCancel();
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

  useEffect(() => {
    console.log(userList);
  }, [ userList ])

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
          {isEmpty(item?.avatar) ? <Avatar>{item?.username[ 0 ]}</Avatar> : <Avatar src={item?.avatar} />}
          <Typography.Text mark></Typography.Text> {
            (item.lastName && item.firstName) ? `${item.lastName} ${item.firstName}` : item.username
          }
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
      {!isEmpty(userList) && map(userList, ({ user_information: userInfo, id, username }) => {
        const displayName = (userInfo.lastName && userInfo.firstName) ? `${userInfo.lastName} ${userInfo.firstName}` : username;
        const avatar = isEmpty(userInfo.avatar) && username[ 0 ];

        return (<Select.Option value={id} label={displayName}>
          <div className="demo-option-label-item">
            <span role="img" aria-label="China" className="mv-small">
              <Avatar src={userInfo?.avatar}>{avatar}</Avatar>
            </span>
            {displayName}
          </div>
        </Select.Option>)
      })
      }

    </Select>}
  </Modal>
});

MessageMembersModal.displayName = 'MessageMembersModal';