import React, { Component } from 'react';
import 'antd/dist/antd.css';
//import './index.css';
import { Layout, Menu, Breadcrumb, notification, Spin, Card, Skeleton } from 'antd';
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
  defaultSelectedKeys: string;
  defaultOpenKeys: string;
}
export class PlanetView extends Component<PlanViewProps, IPlanetViewStates> {
  state = {
    defaultSelectedKeys: '',
    defaultOpenKeys: '',
  };

  componentDidMount = async () => {
    const { doFetchDetailsPhase } = this.props;
    const id = _.replace(window.location.pathname, '/planets/', '');
    //do fetch phase with programId
    try {
      doFetchDetailsPhase({ programId: 1, phaseId: id });
    } catch (error) {
      notification.error({ message: 'Failed to fetch this phase.' });
    }
  };

  componentDidUpdate(preProps: PlanViewProps, preState: IPlanetViewStates) {

  }

  private _onFetchTasks({ checklistId }: { checklistId: number }) {

    try {
      this.props.doFetchTasks({ checklistId });

    } catch (error) {
      notification.error({ message: "Failed to fetch tasks." });
    }

  }

  private _onFetchFetchQuestionAnswer(task: ITask) {
    switch (task.typeId) {
      case TaskCategory.SINGLE_CHOICE:
      case TaskCategory.MULTIPLE_CHOICES:
        this.props.doFetchSelectedQuestionAnswer({ taskId: task.id });
        break;
      case TaskCategory.WRITTING:
        this.props.doFetchContructedQuestionAnswer({ taskId: task.id });
        break;
      case TaskCategory.BINARY:
        this.props.doFetchBinaryQuestionAnswer({ taskId: task.id });
        break;
      case TaskCategory.MATCH_SEQUENCE:
        this.props.doFetchMatchingSequenceQuestionAnswer({ taskId: task.id });
        break;
      case TaskCategory.MATCH_CORESPONSE:
        this.props.doFetchMatchingCorrespondingQuestionAnswer({ taskId: task.id });
        break;
      case TaskCategory.ASSIGNMENT:
        this.props.doFetchUserAnswerAssignment({ taskId: task.id });
        break;
        case TaskCategory.DOCUMENT:
        this.props.doFetchUserAnswerDocument({ taskId: task.id });
        break;
      default:
        break;
    }
  }

  private _onChangeSelectedTask(task: ITask) {

    if (task) {

      this.props.setSeletedTask(task);
      this._onFetchFetchQuestionAnswer(task);
    }
  }

  render() {
    const {
      selectedPhase,

      doSubmitBinaryQuestion,
      doSubmitContructedQuestion,
      doSubmitSelectedQuestionAnswer,
      doSubmitMatchingSequenceQuestion,
      doSubmitMatchingCorrespondingQuestion,
      doSubmitAssignment,

      doUpdateSubmitBinaryQuestion,
      doUpdateSubmitContructedQuestion,
      doUpdateSubmitSelectedQuestionAnswer,
      doUpdateMatchingSequenceQuestion,
      doUpdateMatchingCorrespondingQuestion,
      doUpdateAssignment,

      isFetchingTask,
      isFetchingChecklist,
      isFetchingPhase,
      isFetchingAnswer,
      isSubmitingAnswer,
    } = this.props;
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
            defaultSelectedKeys={[ defaultSelectedKeys ]}
            defaultOpenKeys={[ defaultOpenKeys ]}
            style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}
          >
            {_.map(selectedPhase.checklists, (checklist) => (
              <SubMenu
                key={checklist.id}
                icon={<NotificationOutlined />}
                title={checklist.title}
                onTitleClick={this._onFetchTasks.bind(this, { checklistId: checklist.id })}
              >
                {isFetchingChecklist ? <Skeleton active={true} /> : _.map(checklist.tasks, (task) => (
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
          <Card style={{ height: '100%' }} className='task--item'>
            <TaskItem
              task={this.props.selectedTask}

              doSubmitBinaryQuestion={doSubmitBinaryQuestion}
              doSubmitContructedQuestion={doSubmitContructedQuestion}
              doSubmitSelectedQuestionAnswer={doSubmitSelectedQuestionAnswer}
              doSubmitMatchingSequenceQuestion={doSubmitMatchingSequenceQuestion}
              doSubmitMatchingCorrespondingQuestion={doSubmitMatchingCorrespondingQuestion}
              doSubmitAssignment={doSubmitAssignment}

              doUpdateSubmitBinaryQuestion={doUpdateSubmitBinaryQuestion}
              doUpdateSubmitContructedQuestion={doUpdateSubmitContructedQuestion}
              doUpdateSubmitSelectedQuestionAnswer={doUpdateSubmitSelectedQuestionAnswer}
              doUpdateMatchingSequenceQuestion={doUpdateMatchingSequenceQuestion}
              doUpdateMatchingCorrespondingQuestion={doUpdateMatchingCorrespondingQuestion}
              doUpdateAssignment={doUpdateAssignment}

              onFetchQuestionAnswer={this._onFetchFetchQuestionAnswer.bind(this)}
              isLoading={isFetchingTask}
              isFetchingAnswer={isFetchingAnswer}
              isSubmitingAnswer={isSubmitingAnswer}
            />
          </Card>
        </Content>
      </Layout>
    </Content>;

    if (isFetchingPhase) {
      content = <Spin size='large' />
    } else if (!_.isEmpty(selectedPhase) && _.isEmpty(selectedPhase.checklists) && !isFetchingTask) {
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
  isFetchingProgram: state.programStore.isFetchingProgram,
  isFetchingTask: state.programStore.isFetchingTask,
  isFetchingPhase: state.programStore.isFetchingPhase,
  isFetchingChecklist: state.programStore.isFetchingChecklist,
  isFetchingAnswer: state.programStore.isFetchingAnswer,
  isSubmitingAnswer: state.programStore.isSubmitingAnswer,
});

const mapDispatchToProps = (dispatch: IRootDispatch) => ({
  doSubmitTask: dispatch.programStore.doSubmitTask,
  doFetchDetailsPhase: dispatch.programStore.doFetchDetailsPhase,
  doFetchTasks: dispatch.programStore.doFetchTasks,
  setSeletedTask: dispatch.programStore.setSeletedTask,

  doFetchSelectedQuestionAnswer: dispatch.programStore.doFetchSelectedQuestionAnswer,
  doFetchContructedQuestionAnswer: dispatch.programStore.doFetchContructedQuestionAnswer,
  doFetchBinaryQuestionAnswer: dispatch.programStore.doFetchBinaryQuestionAnswer,
  doFetchMatchingSequenceQuestionAnswer: dispatch.programStore.doFetchMatchingSequenceQuestionAnswer,
  doFetchMatchingCorrespondingQuestionAnswer: dispatch.programStore.doFetchMatchingCorrespondingQuestionAnswer,
  doFetchUserAnswerAssignment: dispatch.programStore.doFetchUserAnswerAssignment,
  doFetchUserAnswerDocument: dispatch.programStore.doFetchUserAnswerDocument,

  doSubmitSelectedQuestionAnswer: dispatch.programStore.doSubmitSelectedQuestionAnswer,
  doSubmitContructedQuestion: dispatch.programStore.doSubmitContructedQuestion,
  doSubmitBinaryQuestion: dispatch.programStore.doSubmitBinaryQuestion,
  doSubmitMatchingSequenceQuestion: dispatch.programStore.doSubmitMatchingSequenceQuestion,
  doSubmitMatchingCorrespondingQuestion: dispatch.programStore.doSubmitMatchingCorrespondingQuestion,
  doSubmitAssignment: dispatch.programStore.doSubmitAssignment,

  doUpdateSubmitSelectedQuestionAnswer: dispatch.programStore.doUpdateSubmitSelectedQuestionAnswer,
  doUpdateSubmitContructedQuestion: dispatch.programStore.doUpdateSubmitContructedQuestion,
  doUpdateSubmitBinaryQuestion: dispatch.programStore.doUpdateSubmitBinaryQuestion,
  doUpdateMatchingSequenceQuestion: dispatch.programStore.doUpdateMatchingSequenceQuestion,
  doUpdateMatchingCorrespondingQuestion: dispatch.programStore.doUpdateMatchingCorrespondingQuestion,
  doUpdateAssignment: dispatch.programStore.doUpdateAssignment,
});

type PlanViewStateProps = ReturnType<typeof mapStateToProps>;
type PlanViewDispatchProps = ReturnType<typeof mapDispatchToProps>;
type PlanViewProps = PlanViewStateProps & PlanViewDispatchProps;

export default connect(mapStateToProps, mapDispatchToProps)(PlanetView);
