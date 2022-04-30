import { Breadcrumb, Button, Card, Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { useEffect, useState } from "react";
import HeaderInternal from "../../components/layouts/Header/HeaderInternal";
import { MessageDetail } from "../../components/message-conversation/message-conversation.component";

import { MessagesList } from "../../components/message/MessagesList";

const initialState = {
  initLoading: true,
  loading: false,
  data: [],
  list: [],
};

const count = 7;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const Messages = () => {
  const [ state, setState ] = useState<typeof initialState>(initialState);

  useEffect(() => {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        const newState = {
          ...state,
          initLoading: false,
          data: res.results,
          list: res.results,
        }
        setState(newState);
      });
  }, [])

  const onLoadMore = () => {
    setState({
      ...state,
      loading: true,
    });
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        const data = state.data.concat(res.results);
        setState(
          {
            ...state,
            data,
            list: data,
            loading: false,
          }
        );
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

  const onClickItem = () => { };
  return (
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
          <Sider className="site-layout-background" width={400}>

            <MessagesList
              onClickItem={onClickItem}
              initLoading={initLoading} list={list}
              loadMore={loadMore} />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Card style={{ height: '100%' }} className='task--item'>
            <MessageDetail/>
            </Card>
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}

export default Messages;