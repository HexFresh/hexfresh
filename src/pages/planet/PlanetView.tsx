import React, { Component } from 'react';
import 'antd/dist/antd.css';
//import './index.css';
import { Layout, Menu, Breadcrumb, notification, Spin, Card } from 'antd';
import {
  NotificationOutlined,
} from '@ant-design/icons';
import FooterFresher from '../../components/layouts/footer/FooterFresher';
import { IRootDispatch, IRootStore } from '../../store/store';
import { connect } from 'react-redux';
import _ from 'lodash';
import TaskItem from '../../components/task/TaskItem';
import { ITask } from '../../interface/program-interface';
import HeaderInternal from '../../components/layouts/Header/HeaderInternal';
import { EmptyResult } from '../../components/results';
import { TaskCategory } from '../../utilities/enum-utils';

import './planetview.scss';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

interface IPlanetViewStates {
  selectedTask: ITask | null;
  defaultSelectedKeys: string;
  defaultOpenKeys: string;
  isLoading: boolean;
}
export class PlanetView extends Component<PlanViewProps, IPlanetViewStates> {
  state = {
    selectedTask: null,
    defaultSelectedKeys: '',
    defaultOpenKeys: '',
    isLoading: false,
  };

  componentDidMount = async () => {
    const { doFetchDetailsPhase } = this.props;
    const id = _.replace(window.location.pathname, '/planets/', '');
    //do fetch phase with programId
    this.setState({ isLoading: true });
    try {
      doFetchDetailsPhase({ programId: 1, phaseId: id });
    } catch (error) {
      notification.error({ message: 'Failed to fetch this phase.' });
    }
    this.setState({ isLoading: false });
  };

  componentDidUpdate(preProps: PlanViewProps, preState: IPlanetViewStates) {
    if (!_.isEqual(preProps, this.props)) {

    }
    console.log(this.state.isLoading);
  }

  private _onFetchTasks({ checklistId }: { checklistId: number }) {

    try {
      this.props.doFetchTasks({ checklistId });

    } catch (error) {
      notification.error({ message: "Failed to fetch tasks." });
    }
  }

  private _onFetchFetchQuestionAnswer(task: ITask) {
    this.setState({ isLoading: true });
    console.log(this);
    switch (task.typeId) {
      case TaskCategory.SINGLE_CHOICE:
      case TaskCategory.MULTIPLE_CHOICES:
        this.props.doFetchSelectedQuestionAnswer({ taskId: task.id });
        break;
      case TaskCategory.WRITTING:
        this.props.doFetchContructedQuestionAnswer({ taskId: task.id });
        break;
      case TaskCategory.BINARY:
        this.props.doFetchBinaryQuestion({ taskId: task.id });
        break;
      default:
        break;
    }
    this.setState({ isLoading: false });
  }

  private _onChangeSelectedTask(task: ITask) {
    if (task) {
      this.setState({
        isLoading: true,
        selectedTask: task,
      });
      this.props.setSeletedTask(task);

      this._onFetchFetchQuestionAnswer(task);

      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      selectedPhase,
      doSubmitBinaryQuestion,
      doSubmitContructedQuestion,
      doSubmitSelectedQuestionAnswer,
      doUpdateSubmitBinaryQuestion,
      doUpdateSubmitContructedQuestion,
      doUpdateSubmitSelectedQuestionAnswer
    } = this.props;
    const { isLoading } = this.state;
    const { defaultOpenKeys, defaultSelectedKeys } = this.state;

    let content = <Content className='centered' style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item>{selectedPhase.title}</Breadcrumb.Item>
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
            {_.map(selectedPhase.checklists, (checklist) => (
              <SubMenu
                key={checklist.id}
                icon={<NotificationOutlined />}
                title={checklist.title}
                onTitleClick={this._onFetchTasks.bind(this, { checklistId: checklist.id })}
              >
                {_.map(checklist.tasks, (task) => (
                  <Menu.Item
                    key={task.id}
                    onClick={this._onChangeSelectedTask.bind(this, task)}
                  >
                    {task.title}
                  </Menu.Item>
                ))}
              </SubMenu>
            ))}
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Card>
            <TaskItem
              task={this.props.selectedTask}
              doSubmitBinaryQuestion={doSubmitBinaryQuestion}
              doSubmitContructedQuestion={doSubmitContructedQuestion}
              doSubmitSelectedQuestionAnswer={doSubmitSelectedQuestionAnswer}

              doUpdateSubmitBinaryQuestion={doUpdateSubmitBinaryQuestion}
              doUpdateSubmitContructedQuestion={doUpdateSubmitContructedQuestion}
              doUpdateSubmitSelectedQuestionAnswer={doUpdateSubmitSelectedQuestionAnswer}

              onFetchQuestionAnswer={this._onFetchFetchQuestionAnswer}
              isLoading={isLoading}
            />
          </Card>
        </Content>
      </Layout>
    </Content>;

    if (isLoading) {
      content = <Spin size='large' />
    } else if (!_.isEmpty(selectedPhase) && _.isEmpty(selectedPhase.checklists) && !isLoading) {
      content = <EmptyResult message={"Opps, we don't have any checklist here."} />
    }
    return (
      <Layout className="full-height">
        <HeaderInternal textColorClassName='txt-color-black' />
        {content}
        <FooterFresher />
      </Layout>
    );
  }
}

const mapStateToProps = (state: IRootStore) => ({
  selectedPhase: state.programStore.selectedPhase,
  program: state.programStore.program,
  selectedTask: state.programStore.selectedTask,
});

const mapDispatchToProps = (dispatch: IRootDispatch) => ({
  doSubmitTask: dispatch.programStore.doSubmitTask,
  doFetchDetailsPhase: dispatch.programStore.doFetchDetailsPhase,
  doFetchTasks: dispatch.programStore.doFetchTasks,
  setSeletedTask: dispatch.programStore.setSeletedTask,

  doFetchSelectedQuestionAnswer: dispatch.programStore.doFetchSelectedQuestionAnswer,
  doFetchContructedQuestionAnswer: dispatch.programStore.doFetchContructedQuestionAnswer,
  doFetchBinaryQuestion: dispatch.programStore.doFetchBinaryQuestion,

  doSubmitSelectedQuestionAnswer: dispatch.programStore.doSubmitSelectedQuestionAnswer,
  doSubmitContructedQuestion: dispatch.programStore.doSubmitContructedQuestion,
  doSubmitBinaryQuestion: dispatch.programStore.doSubmitBinaryQuestion,
  doUpdateSubmitSelectedQuestionAnswer: dispatch.programStore.doUpdateSubmitSelectedQuestionAnswer,
  doUpdateSubmitContructedQuestion: dispatch.programStore.doUpdateSubmitContructedQuestion,
  doUpdateSubmitBinaryQuestion: dispatch.programStore.doUpdateSubmitBinaryQuestion,
});

type PlanViewStateProps = ReturnType<typeof mapStateToProps>;
type PlanViewDispatchProps = ReturnType<typeof mapDispatchToProps>;
type PlanViewProps = PlanViewStateProps & PlanViewDispatchProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlanetView);
