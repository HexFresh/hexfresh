import { Breadcrumb, Button, Card, Layout } from "antd";
import Search from "antd/lib/input/Search";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
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

  selectedConversation,
  conversations,
  profileRecipients,
  isFetchingConversations,
  isFetchingConversation,
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

  const onClickItem = async (item: IConversation) => {
    console.log(item);
    await doFetchConversation({conversationId: item?._id, skip:0, limit: 0});
  };

  const handleAddChat = useCallback(() =>
    setActiveModal(true)
    , []);

  const handleCancleAddChat = useCallback(() =>
    setActiveModal(false)
    , []);

  const handleSubmitModal = useCallback(() => {

    setActiveModal(false);
  }
    , []);

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
                loadMore={loadMore} />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Card style={{ height: '100%' }} className='task--item'>
                <MessageDetail 
                isLoading={isFetchingConversation}
                conversation={selectedConversation}
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
});

const mapDispatchToProps = (dispatch: IRootDispatch) => ({
  doCreateConversation: dispatch.message.doCreateConversation,
  doFetchAllConversation: dispatch.message.doFetchAllConversation,
  doFetchConversation: dispatch.message.doFetchConversation,
  doRenameConversation: dispatch.message.doRenameConversation,
  doFetchRecipientsProfile: dispatch.message.doFetchRecipientsProfile,
});

type MessageStateProps = ReturnType<typeof mapStateToProps>;
type MessageDispatchProps = ReturnType<typeof mapDispatchToProps>;

type MessageProps = MessageDispatchProps & MessageStateProps;

export default connect(mapStateToProps, mapDispatchToProps)(Messages);