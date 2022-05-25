import { SendOutlined, MoreVert, MoreOutlined } from "@mui/icons-material";
import { Avatar, Button, Dropdown, Form, Input, Menu, Skeleton } from "antd";
import { memo, useCallback, useEffect, useState } from "react"
import _ from 'lodash';
import { io } from "socket.io-client";
import { message as messageAnt } from 'antd'

import { socketInstance } from '../../utils/socketioInit';
import './message-conversation.scss';
import { IConversation } from "../../store/message/message-interface";
import { MessageContent } from "./message-content/message-content.component";
import { EmptyResult } from "../results";
import { IUser } from "../../store/user/user-interface";
import { useSelector } from "react-redux";
import { IRootStore } from "../../store/store";
import { ChatType } from "../../utilities/enum-utils";
import { MessageMembersModal } from "../message/message-member-modal/message-member-modal";

export const MessageDetail = memo(({
  isLoading,
  conversation,
  profileRecipients,
  doRenameConversation,
  doRecieveMessage,
}: {
  isLoading: boolean,
  conversation: IConversation,
  profileRecipients: IUser,
  doRenameConversation: any,
  doRecieveMessage: any,
}) => {
  const [ messageString, setMessage ] = useState<string>('');
  const [ socket, setSocket ] = useState(io());
  const [ isOpenMembersModal, setOpenMembersModal ] = useState<boolean>(false);
  const [ conversationId, setConversationId ] = useState('');
  const [ isEditTitle, setIsEditTitle ] = useState<boolean>(false);
  const [ title, setTitle ] = useState<string>("");
  const userId = useSelector((state: IRootStore) => state.user?.id);
  const [ form ] = Form.useForm();

  const onFinish = async () => {
    const payload = { title };
    messageAnt.loading('Updating title...', 2.5);
    await doRenameConversation({ conversationId, payload });
    messageAnt.success('Update finish', 1);
    setIsEditTitle(false);

  };

  const onChangeMessage = (event: any) => {
    const { value } = event.target;
    !_.isEmpty(value) && setMessage(value);
  };

  const onSendMessage = useCallback(() => {
    if (!_.isEmpty(messageString)) {
      const messagePayload = {
        conversationId,
        data: messageString,
      };

      socket.emit(`send message`, messagePayload);
    }

    setMessage('');
  }, [ conversationId, messageString, socket ]);

  const handleChangeTitle = useCallback((event: any) => {
    const value = event.target.value;

    !_.isEmpty(value) && setTitle(value);
  }, [])

  useEffect(() => {
    const newSocket = socketInstance;
    setSocket(newSocket);
  }, [])

  useEffect(() => {
    setTitle(conversation?.title);
    setConversationId(conversation?._id);
  }, [ conversation ])

  useEffect(() => {
    socket.off("receive message").on("receive message", (data) => {
      doRecieveMessage({ messagePayload: data })
    })
  }, [ doRecieveMessage, socket ])

  if (_.isEmpty(conversation)) { return <EmptyResult message="Your conversation will display here." /> }

  return isLoading ?
    <Skeleton avatar title={false} loading={isLoading} active /> :
    <>
      <section className="chat">
        <div className="header-chat">
          <Avatar size='large' >Y</Avatar>
          {!isEditTitle ? <p className="name">{conversation?.title}</p> :
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item>
                <Input placeholder="Input your conversation title here." defaultValue={conversation?.title} value={title} onChange={handleChangeTitle} />
              </Form.Item>

            </Form>}
          <Dropdown key="more" overlay={<Menu>
            <Menu.Item onClick={() => setOpenMembersModal(true)}>
              View members
            </Menu.Item>
            <Menu.Item onClick={() => setIsEditTitle(!isEditTitle)}>
              Edit title
            </Menu.Item>
            <Menu.Item onClick={() => setIsEditTitle(!isEditTitle)}>
              Add member
            </Menu.Item>
          </Menu>
          } placement="bottomRight" className="right icon">
            <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
          </Dropdown>
        </div>
        <div className="messages-chat">
          {_.reverse(_.map(conversation?.messages, message => <MessageContent profileRecipients={profileRecipients} message={message?.message} />))}
        </div>
        <div className="footer-chat">
          <Input onChange={onChangeMessage} onPressEnter={onSendMessage} value={messageString} className="write-message" placeholder="Type your message here"></Input>
          <SendOutlined onClick={onSendMessage} color="primary" className="icon" style={{ cursor: 'pointer' }} />
        </div>
      </section>
      <MessageMembersModal
        onCancel={() => { setOpenMembersModal(false) }}
        isOpen={isOpenMembersModal}
        onSubmit={() => { }}
        isLoading={false}
        isAddMember
      />
    </>
});

MessageDetail.displayName = 'MessageDetail';