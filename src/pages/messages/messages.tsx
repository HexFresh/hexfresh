import { Breadcrumb, Button, Card, Layout } from "antd";
import Search from "antd/lib/input/Search";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import _ from "lodash";
import { FC, useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import HeaderInternal from "../../components/layouts/Header/HeaderInternal";
import { MessageDetail } from "../../components/message-conversation/message-conversation.component";
import { MessageCreateModal } from "../../components/message/message-create-modal/message-create-modal.component";
import { MessageListHeader } from "../../components/message/message-list-header/message-list-header.component";

import { MessagesList } from "../../components/message/MessagesList";
import { IConversation } from "../../store/message/message-interface";
import { IRootDispatch, IRootStore } from "../../store/store";

export type Message = {
  id: string;
  from: string;
  data: string;
  recipients: string[];
  createdAt: Date;
}

const initialState = {
  initLoading: true,
  loading: false,
  data: [],
  list: [],
};

const Messages: FC<MessageProps> = ({
  doCreateConversation,
  doFetchAllConversation,
  doFetchConversation,
  doRenameConversation,
  doFetchRecipientsProfile,
  doRecieveMessage,
  doAddMember,
  doLeaveConversation,

  selectedConversation,
  conversations,
  profileRecipients,
  isFetchingConversations,
  isFetchingConversation,
  isFetchingRecipients,
  isAddingMember,
  isLeavingConversation,
  forceScrollDown,
}) => {
  const [ state, setState ] = useState<typeof initialState>(initialState);
  const [ isActiveModal, setActiveModal ] = useState<boolean>(false);

  useEffect(() => {
    doFetchAllConversation();
    setState({
      ...state,
      initLoading: false,
    })
  }, [])

  const onLoadMore = () => {
    setState({
      ...state,
      loading: true,
    });

  };

  const { initLoading, data, list, loading } = state;
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const onClickItem = useCallback(async (item: IConversation) => {
    await doFetchConversation({ conversationId: item?._id, skip: 0, limit: 0 });
  }, [ doFetchConversation ]);

  const handleAddChat = useCallback(() =>
    setActiveModal(true)
    , []);

  const handleCancleAddChat = useCallback(() =>
    setActiveModal(false)
    , []);

  const handleSubmitModal = useCallback((recipientIds, title) => {
    const createConversation = async () => {
      await doCreateConversation({ recipients: recipientIds, title });
      await doFetchAllConversation();
    }
    createConversation();
    setActiveModal(false);
  }
    , [ doCreateConversation, doFetchAllConversation ]);

  useEffect(() => {
    !_.isEmpty(selectedConversation?.recipients) && doFetchRecipientsProfile({ recipients: selectedConversation?.recipients })
  }, [ doFetchRecipientsProfile, selectedConversation ])

  return (
    <>
      <Layout className="full-height">
        <HeaderInternal textColorClassName='txt-color-black' />
        <Content className='centered' style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Messages</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background ant-layout-has-sider"
            style={{ padding: '24px 0' }}
          >
            <Sider className="site-layout-background b-white p-medium" width={400}>
              <MessageListHeader className="mb-medium" onAddChat={handleAddChat} />
              <Search
                className="mb-medium"
                placeholder="Search conversaiclatons"
                allowClear
                enterButton
                size="large"
                onSearch={(value) => { console.log(value) }}
              />
              <MessagesList
                isLoading={isFetchingConversations}
                conversations={conversations}
                onClickItem={onClickItem}
                initLoading={initLoading}
                list={list}
                loadMore={loadMore} 
                doFetchRecipientsProfile={doFetchRecipientsProfile}
                profileRecipients={profileRecipients}
                />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280, overflowY: 'scroll' }}>
              <Card className='message-detail'>
                <MessageDetail
                  doRecieveMessage={doRecieveMessage}
                  profileRecipients={profileRecipients}
                  isLoading={isFetchingConversation || isFetchingRecipients}
                  isAddingMember={isAddingMember}
                  conversation={selectedConversation}
                  doRenameConversation={doRenameConversation}
                  doAddMember={doAddMember}
                  doLeaveConversation={doLeaveConversation}
                  doFetchRecipientsProfile={doFetchRecipientsProfile}
                  forceScrollDown={forceScrollDown}
                />
              </Card>
            </Content>
          </Layout>
        </Content>
      </Layout>
      <MessageCreateModal
        isOpenModal={isActiveModal}
        loading={false}
        onCancel={handleCancleAddChat}
        onSearchUser={(value: any) => { console.log(value) }}
        onSubmit={handleSubmitModal}
      />
    </>
  )
}

const mapStateToProps = (state: IRootStore) => ({
  selectedConversation: state.message.selectedConversation,
  conversations: state.message.conversations,
  profileRecipients: state.message.profileRecipients,
  isFetchingConversations: state.message.isFetchingConversations,
  isFetchingConversation: state.message.isFetchingConversation,
  isFetchingRecipients: state.message.isFetchingRecipients,
  isAddingMember: state.message.isAddingMember,
  isLeavingConversation: state.message.isLeavingConversation,
  forceScrollDown: state.message.forceScrollDown,
});

const mapDispatchToProps = (dispatch: IRootDispatch) => ({
  doCreateConversation: dispatch.message.doCreateConversation,
  doFetchAllConversation: dispatch.message.doFetchAllConversation,
  doFetchConversation: dispatch.message.doFetchConversation,
  doRenameConversation: dispatch.message.doRenameConversation,
  doFetchRecipientsProfile: dispatch.message.doFetchRecipientsProfile,
  doRecieveMessage: dispatch.message.doRecieveMessage,
  doAddMember: dispatch.message.doAddMember,
  doLeaveConversation: dispatch.message.doLeaveConversation,
});

type MessageStateProps = ReturnType<typeof mapStateToProps>;
type MessageDispatchProps = ReturnType<typeof mapDispatchToProps>;

type MessageProps = MessageDispatchProps & MessageStateProps;

export default connect(mapStateToProps, mapDispatchToProps)(Messages);