import React, { Component } from 'react';
import 'antd/dist/antd.css';
//import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import FooterFresher from '../../components/layouts/footer/FooterFresher';
import { IRootDispatch, IRootStore } from '../../store/store';
import { connect } from 'react-redux';
import _ from 'lodash';
import TaskItem from '../../components/task/TaskItem';
import { ITask } from '../../interface/program-interface';
import { RematchDispatch } from '@rematch/core';
import HeaderInternal from '../../components/layouts/Header/HeaderInternal';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

interface IPlanetViewStates {
  selectedTask: ITask | null;
  defaultSelectedKeys: string;
  defaultOpenKeys: string;
}

/* interface IPlanetViewProps {
  selectedProgram?: RematchDispatch<>;
  programs?: typeof state.programStore.programs;
  setSelectedProgram?: typeof dispatch.programStore.setSelectedProgram;
} */

export class PlanetView extends Component<PlanViewProps, IPlanetViewStates> {
  state = {
    selectedTask: null,
    defaultSelectedKeys: '',
    defaultOpenKeys: '',
  };

  componentDidMount = async () => {
    const { selectedProgram, programs } = this.props;
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('planetId');

    //do fetch program with programId

    const program = _.find(programs, ['id', id]);

    if (program) {
    }

    const selectedKey = selectedProgram && selectedProgram.checklists[0].id;
    const firstTask = selectedProgram && selectedProgram.checklists[0].tasks[0];

    this.setState({
      defaultSelectedKeys: selectedKey,
      defaultOpenKeys: firstTask.id,
      selectedTask: firstTask,
    });
  };

  componentDidUpdate(preProps: PlanViewProps, preState: IPlanetViewStates) {
    //console.log(preProps,preState);
  }

  private _onChangeSelectedTask(task: ITask) {
    if (task) {
      this.setState({
        selectedTask: task,
      });
    }
  }

  render() {
    const { selectedProgram, doSubmitTask } = this.props;
    const { selectedTask, defaultOpenKeys, defaultSelectedKeys } = this.state;

    return (
      <Layout className="full-height">
        <HeaderInternal textColorClassName='txt-color-black'/>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedProgram?.name}</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: '24px 0' }}
          >
            <Sider className="site-layout-background" width={300}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[defaultSelectedKeys]}
                defaultOpenKeys={[defaultOpenKeys]}
                style={{ height: '100%' }}
              >
                {_.map(selectedProgram.checklists, (checklist) => (
                  <SubMenu
                    key={checklist.id}
                    icon={<NotificationOutlined />}
                    title={checklist.name}
                  >
                    {_.map(checklist.tasks, (task) => (
                      <Menu.Item
                        key={task.id}
                        onClick={this._onChangeSelectedTask.bind(this, task)}
                      >
                        {task.name}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ))}
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <TaskItem task={selectedTask} doSubmitTask={doSubmitTask} />
            </Content>
          </Layout>
        </Content>
        <FooterFresher />
      </Layout>
    );
  }
}

const mapStateToProps = (state: IRootStore) => ({
  selectedProgram: state.programStore.selectedProgram,
  programs: state.programStore.programs,
});

const mapDispatchToProps = (dispatch: IRootDispatch) => ({
  setSelectedProgram: dispatch.programStore.setSelectedProgram,
  doSubmitTask: dispatch.programStore.doSubmitTask,
});

type PlanViewStateProps = ReturnType<typeof mapStateToProps>;
type PlanViewDispatchProps = ReturnType<typeof mapDispatchToProps>;
type PlanViewProps = PlanViewStateProps & PlanViewDispatchProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlanetView);
