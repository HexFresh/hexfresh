import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { ITask } from '../../interface/program-interface'
import { TaskCategory } from '../../utilities/enum-utils';

import { message, Radio, Space, Checkbox, Button, List, Skeleton } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Dragger from 'antd/lib/upload/Dragger';
import TextArea from 'antd/lib/input/TextArea';

import _ from 'lodash';
import { EmptyResult } from '../results';

interface ITaskItemProps {
  task: ITask | null;
  isLoading: boolean;
  isFetchingAnswer: boolean;
  doSubmitSelectedQuestionAnswer: any;
  doSubmitContructedQuestion: any;
  doSubmitBinaryQuestion: any;
  onFetchQuestionAnswer: any;
  doUpdateSubmitBinaryQuestion: any;
  doUpdateSubmitContructedQuestion: any;
  doUpdateSubmitSelectedQuestionAnswer: any;
}

interface ITaskItemState {
  radioValue: number;
  selectedFiles: File[];
  multipleChoices: string[];
  inputTextArea: string;
  binaryChoices: any[];
  displayActionButtonGroup: boolean;
  isTaken: boolean;
  isEmptyQuiz: boolean;
  isEdit: boolean;
  isCorrect: boolean;
}

const initialState = {
  radioValue: 1,
  selectedFiles: [],
  multipleChoices: [],
  inputTextArea: '',
  binaryChoices: [],
  displayActionButtonGroup: true,
  isTaken: false,
  isEmptyQuiz: false,
  isEdit: false,
  isCorrect: false,
}

export class TaskItem extends Component<ITaskItemProps, ITaskItemState> {

  constructor(props: ITaskItemProps) {
    super(props);

    this.state = {
      ...initialState
    };
  }

  componentDidMount() {

    console.log('did mount');
  }

  componentDidUpdate(prevProps: ITaskItemProps, prevState: ITaskItemState) {

    if (!_.isEqual(prevProps, this.props)) {
      const { task, isLoading } = this.props;
      const { isEdit } = this.state;
      let isTakenTemp = this.state.isTaken;
      let isEmptyQuizTemp = this.state.isEmptyQuiz;
      let isCorrectTemp = false;

      switch (task?.typeId) {
        case TaskCategory.SINGLE_CHOICE:
        case TaskCategory.MULTIPLE_CHOICES:
          if (!_.isEmpty(task.answersSelectedQuestion)) {
            isTakenTemp = true;
            // calculate for correct answer
            if (task.answersSelectedQuestion.answers.length === 1) {
              if (task.answersSelectedQuestion.answers[0].choiceAnswer) {

                isCorrectTemp = true;
              }
            } else {
              if (!_.some(task.answersSelectedQuestion.answers, false) || !_.some(task.answersSelectedQuestion.answers, ['choiceAnswer', null])) {
                isCorrectTemp = true;
              }
            }
          } else {
            isTakenTemp = false;
          };

          if (_.isEmpty(task.selected_question_choices)) {
            isEmptyQuizTemp = true;
          } else {
            isEmptyQuizTemp = false;
          }
          break;
        case TaskCategory.WRITTING:
          if (!_.isEmpty(task.answerConstructedQuestion)) {
            isTakenTemp = true;
          } else {
            isTakenTemp = false;
          };

          if (_.isEmpty(task.quiz)) {
            isEmptyQuizTemp = true;
          } else {
            isEmptyQuizTemp = false;
          }
          break;
        case TaskCategory.BINARY:
          if (!_.isEmpty(task.answerBinaryQuestion)) {
            isTakenTemp = true;
          } else {
            isTakenTemp = false;
          };

          if (_.isEmpty(task.true_false_question_options)) {
            isEmptyQuizTemp = true;
          } else {
            isEmptyQuizTemp = false;
          }
          break;
        default:
          break;
      }

      this.setState({
        isTaken: isTakenTemp,
        isEmptyQuiz: isEmptyQuizTemp,
        isCorrect: isCorrectTemp,
      })

    }

  }

  private _onChangeSingleChoice(e: any) {
    const { value } = e.target;

    if (value) {
      this.setState({
        radioValue: value,
      });
    }
  }

  private _onChangeMultipleChoices(checkedValues: any) {

    if (checkedValues) {
      this.setState({
        multipleChoices: checkedValues,
      });
    }
    console.log(this.state.multipleChoices);
  }

  private _onChangeTextArea({ target }: any) {
    this.setState({ inputTextArea: target.value });
  }

  private _onChangeBinaryChoices(e: any) {
    const { value } = e.target;

    if (value) {

      const tempState = _.filter(this.state.binaryChoices, item => item.id !== value.id);

      let binaryChoices = [...tempState, JSON.parse(value)];

      this.setState({ binaryChoices: binaryChoices });
      console.log(this.state.binaryChoices, 'binary choice');
    }
  }

  private _onSubmitTask = () => {
    const {
      task,
      doSubmitBinaryQuestion,
      doSubmitContructedQuestion,
      doSubmitSelectedQuestionAnswer,
      onFetchQuestionAnswer,
      doUpdateSubmitBinaryQuestion,
      doUpdateSubmitContructedQuestion,
      doUpdateSubmitSelectedQuestionAnswer,
    } = this.props;
    const { inputTextArea, multipleChoices, radioValue, binaryChoices } = this.state;
    let payload = {};
    try {
      switch (task?.typeId) {
        case TaskCategory.SINGLE_CHOICE:
          console.log(radioValue);
          if (radioValue) {

            payload = {
              answers: [
                { choiceId: radioValue }
              ]
            };
            console.log(payload, 'payload');
            if (_.isEmpty(task.answersSelectedQuestion)) {
              doSubmitSelectedQuestionAnswer({ answers: payload, taskId: task.id });
            } else {
              doUpdateSubmitSelectedQuestionAnswer({ answers: payload, taskId: task.id });
            }
          }
          break;
        case TaskCategory.MULTIPLE_CHOICES:
          if (!_.isEmpty(multipleChoices)) {
            let mapResult: { choiceId: number; }[] = [];
            _.forEach(multipleChoices, function (value) {
              mapResult.push({
                choiceId: Number.parseInt(value)
              })
            })
            let payload = {
              answers: [...mapResult]
            };
            console.log(payload, 'payload');
            if (_.isEmpty(task.answersSelectedQuestion)) {
              doSubmitSelectedQuestionAnswer({ answers: payload, taskId: task.id });
            } else {
              doUpdateSubmitSelectedQuestionAnswer({ answers: payload, taskId: task.id });
            }
          }
          break;
        case TaskCategory.WRITTING:
          if (!_.isEmpty(inputTextArea)) {

            payload = { answer: inputTextArea };
            console.log(payload, 'payload');
            if (_.isEmpty(task.answerConstructedQuestion)) {
              doSubmitContructedQuestion({ answer: payload, taskId: task.id });
            } else {
              doUpdateSubmitContructedQuestion({ answer: payload, taskId: task.id });
            }
          }
          break;
        case TaskCategory.BINARY:
          if (!_.isEmpty(binaryChoices)) {

            let uploadValue: { optionId: any; isRight: any; }[] = [];
            _.forEach(binaryChoices, function (value) {
              uploadValue.push({
                optionId: value.id,
                isRight: value.userAnswer,
              })
            });
            payload = {
              answers: [...uploadValue]
            }
            console.log(payload, 'payload');
            if (_.isEmpty(task?.answerBinaryQuestion)) {
              doSubmitBinaryQuestion({ answers: payload, taskId: task.id });
            } else {
              doUpdateSubmitBinaryQuestion({ answers: payload, taskId: task.id });
            }
          }
          break;
        default:
          break;
      }
      onFetchQuestionAnswer(task);
      this.setState({ isEdit: false });
    } catch (error) {

    }

    this.setState(initialState);
  }

  private _onRetakeTask = () => {
    this.setState({
      isEdit: true
    })
  }

  private _renderTaskContent() {
    const { task, isLoading } = this.props;
    const { binaryChoices, multipleChoices, isEdit, isTaken, inputTextArea } = this.state;
    if (isLoading) {
      return <Skeleton active={true} />
    }
    if (!_.isEmpty(task)) {
      switch (task?.typeId) {
        case TaskCategory.ASSIGNMENT:
          const props = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange(info: any) {
              const { status } = info.file;
              if (status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
            onDrop(e: any) {
              console.log('Dropped files', e.dataTransfer.files);
            },
          };
          return <>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
              </p>
            </Dragger>,
          </>;
        case TaskCategory.MULTIPLE_CHOICES:
          return <>
            <Checkbox.Group style={{ width: '100%' }}
              onChange={this._onChangeMultipleChoices.bind(this)}
              value={
                task?.answersSelectedQuestion?.answers ?
                  task.answersSelectedQuestion.answers.map(item => item.choiceId) :
                  multipleChoices
              }
            >
              <Space direction="vertical">
                {_.map(
                  task.selected_question_choices,
                  choice => <Checkbox key={choice.id} value={choice.id}>{choice.content}</Checkbox>
                )}
              </Space>
            </Checkbox.Group>
          </>;
        case TaskCategory.SINGLE_CHOICE:
          const { radioValue } = this.state;
          const userSingleAnswer = task?.answersSelectedQuestion?.answers ? task.answersSelectedQuestion.answers[0]?.choiceId : radioValue;
          const singleCurrentAppliedValue = (isEdit || !isEdit && !isTaken) ? radioValue : userSingleAnswer;
          return <>
            <Radio.Group style={{ width: '100%' }}
              onChange={this._onChangeSingleChoice.bind(this)}
              value={singleCurrentAppliedValue}>
              <Space direction="vertical">
                {task.selected_question_choices && _.map(
                  task.selected_question_choices,
                  choice => <Radio key={choice.id} value={choice.id}>{choice.content}</Radio>
                )}
              </Space>
            </Radio.Group>
          </>;
        case TaskCategory.WRITTING:

          return <>
            <TextArea /* disabled={!isEdit && isTaken} */
              value={!isEdit ? task?.answerConstructedQuestion?.answer : inputTextArea}
              onChange={this._onChangeTextArea.bind(this)}
              placeholder={_.isEmpty(task.constructed_question_answer?.sampleAnswer) ? "Feel free to text." : task.constructed_question_answer?.sampleAnswer}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </>;
        case TaskCategory.BINARY:

          return <>
            <Space direction='horizontal'>
              <Text strong>True</Text>
              <Text strong>False</Text>
            </Space>
            <List
              dataSource={task.true_false_question_options}
              renderItem={(item) => {
                const answer = _.find(task?.answerBinaryQuestion?.answers, ['optionId', item.id]);
                const currentValue = (isEdit || !isEdit && !isTaken) ? (_.find(binaryChoices, ['id', item.id])) : (
                  { id: answer?.optionId, userAnswer: answer?.userAnswer }
                );
                return <List.Item >
                  <Space direction="horizontal">
                    <Radio.Group style={{ width: '100%' }} onChange={this._onChangeBinaryChoices.bind(this)} value={JSON.stringify(currentValue)}>
                      <Space direction="horizontal">
                        <Radio className='ml-small' key={JSON.stringify({ id: item.id, userAnswer: true })} value={JSON.stringify({ id: item.id, userAnswer: true })}></Radio>
                        <Radio className='ml-small' key={JSON.stringify({ id: item.id, userAnswer: false })} value={JSON.stringify({ id: item.id, userAnswer: false })}></Radio>
                      </Space>
                    </Radio.Group>
                    {item.content}
                  </Space>
                </List.Item>
              }}
            />
          </>;
        default:
          break;
      }
    } else {
      return <EmptyResult message='Task will be displayed here.' />;
    }

  }

  render() {
    const { task, isLoading, isFetchingAnswer } = this.props;
    const { isTaken, isEmptyQuiz, isEdit, isCorrect } = this.state;
    return (
      <div>
        {
          (isLoading || isFetchingAnswer) ? <Skeleton active={true} /> :
            <>
              <Title>{task?.quiz?.question}</Title>
              <br></br>
              {!isEmptyQuiz ?
                this._renderTaskContent() :
                <EmptyResult message='Opps! Waiting for the mentor to create the content for this question.' />}
              {this.state.displayActionButtonGroup &&
                <Space direction="vertical">
                  {isTaken && isCorrect && !isEdit ? <Text type='success'>Your anwser is correct.</Text> : ''}
                  {isTaken && !isCorrect && !isEdit ? <Text type='danger'>Your anwser is incorrect.</Text> : ''}
                  <Space direction="horizontal">
                    {(!_.isEmpty(task) && !isEmptyQuiz && !isTaken || isTaken && isEdit) && <Button type='primary' className='mt-medium mr-medium' loading={isLoading} onClick={this._onSubmitTask}>Submit</Button>}
                    {isTaken && !isEdit ? <Button type='ghost' className='mt-medium' onClick={this._onRetakeTask}>Retake</Button> : ''}
                  </Space>
                </Space>}
            </>
        }

      </div>
    )
  }
}

export default TaskItem;