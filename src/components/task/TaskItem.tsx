import React, { Component } from 'react'
import _, { get, isEmpty } from 'lodash';
import 'antd/dist/antd.css';
import { message, Space, Button, Skeleton, Upload, Card, Typography } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Dragger from 'antd/lib/upload/Dragger';
import TextArea from 'antd/lib/input/TextArea';

import { EmptyResult } from '../results';
import { ISelectedTask, ISequenceTask, ITask } from '../../interface/program-interface'
import { TaskCategory } from '../../utils/enum-utils';
import './taskitem.scss';
import { DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../utils/helpers';
import { MatchSequence } from './match-sequence/MatchSequence';
import { SingleChoice } from './single-choice-quiz/SingleChoice';
import { MultipleChoices } from './multiple-task/MultipleChoices';
import { BinaryQuiz } from './binary-quiz/BinaryQuiz';
import { INT_ONE, INT_TWO, INT_ZERO } from '../../constant';
import { MatchCorrespond } from './match-corresponding/MatchCorrespond';
import { isTrueAnswer } from './match-corresponding/match-correspoding.util';
import { CloseOutlined } from '@mui/icons-material';
import { InlineValue } from '../../core/common/component/inline-value';

export interface IMatchingSequencePair {
  id: number;
  pair: { id: number, content: string }[];
}
interface ITaskItemProps {
  task: ISelectedTask | null;
  isLoading: boolean;
  isFetchingAnswer: boolean;

  isSubmitingAnswer: boolean;
  doSubmitSelectedQuestionAnswer: any;
  doSubmitContructedQuestion: any;
  doSubmitBinaryQuestion: any;
  doSubmitMatchingSequenceQuestion: any;
  doSubmitMatchingCorrespondingQuestion: any;
  doSubmitAssignment: any;
  doSubmitDocument: any;

  onFetchQuestionAnswer: any;

  doUpdateSubmitBinaryQuestion: any;
  doUpdateSubmitContructedQuestion: any;
  doUpdateSubmitSelectedQuestionAnswer: any;
  doUpdateMatchingSequenceQuestion: any;
  doUpdateMatchingCorrespondingQuestion: any;
  doUpdateAssignment: any;
}

interface ITaskItemState {
  radioValue: number;
  selectedFiles: File[];
  multipleChoices: number[];
  inputTextArea: string;
  binaryChoices: any[];
  matchingSequence: ISequenceTask[];
  matchingCorespondingData: any[];
  matchingCorespondingDataSource: any[];
  pairIds: string[];
  matchingSequencePairs: IMatchingSequencePair[];
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
  matchingSequence: [],
  matchingCorespondingData: [],
  matchingCorespondingDataSource: [],
  matchingSequencePairs: [],
  pairIds: Array(2).fill(null),
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
    this.setState({ matchingSequence: this.props.task?.task?.match_sequence_options || [] });
  }

  componentDidUpdate(prevProps: ITaskItemProps, prevState: ITaskItemState) {

    if (!_.isEqual(prevProps.task, this.props.task)) {
      const { task } = this.props;

      let isTakenTemp = task?.isCompleted || false;
      let isEmptyQuizTemp = this.state.isEmptyQuiz;
      let isCorrectTemp = task?.isRight || false;



      if (_.isEmpty(task?.task?.selected_question_choices) &&
        _.isEmpty(task?.task?.constructed_question_answer) &&
        _.isEmpty(task?.task?.true_false_question_options) &&
        _.isEmpty(task?.task?.match_sequence_options) &&
        _.isEmpty(task?.task?.match_corresponding_answers) &&
        _.isEmpty(task?.task?.assignment) &&
        _.isEmpty(task?.task?.document)) {
        isEmptyQuizTemp = true;
      } else {
        isEmptyQuizTemp = false;
      }


      switch (task?.task?.typeId) {

        case TaskCategory.DOCUMENT:
          const element = document.getElementById('taskitem--document__html');
          if (!isEmpty(task?.task?.document?.document) && element) {
            element.innerHTML = task?.task?.document?.document.toString();
          }
          break;
        case TaskCategory.WRITTING:
          if (_.isEmpty(task?.task.quiz)) {
            isEmptyQuizTemp = true;
          } else {
            isEmptyQuizTemp = false;
          }
          break;
        default:
          break;
      }

      const sortedSequence = _.sortBy(task?.user_match_sequence_answer?.answers, [ 'userAnswer' ]);
      const newMatchSequnce = !_.isEmpty(sortedSequence) ? _.map(
        sortedSequence,
        item => {
          return {
            id: item.optionId,
            content: _.find(task?.task?.match_sequence_options, option => option.id === item.optionId)?.content || ''
          }
        }) : task?.task?.match_sequence_options;

      // calculate for matching corresponding answer content
      const columnMatchCorresponding = Array(2).fill([]);
      const firstColumn: { id: number; content: string; }[] = [];
      const secondColumn: { id: number; content: string; }[] = [];
      _.forEach(
        task?.task?.match_corresponding_answers,
        item => {
          const tempValue = {
            id: item.id,
            content: item.content
          }
          item.index === INT_ONE && firstColumn.push(tempValue);
          item.index === INT_TWO && secondColumn.push(tempValue);
        }
      );
      columnMatchCorresponding[ INT_ZERO ] = firstColumn;
      columnMatchCorresponding[ INT_ONE ] = secondColumn;

      //calculate for user answer
      const tempPair: { id: number; pair: { id: number, content: string }[]; }[] = [];
      _.forEach(
        task?.user_match_corresponding_answer?.answers,
        (item, index) => {
          const firstItem = _.find(task?.task?.match_corresponding_answers, [ 'id', item.userFisrtAnswerId ]);
          const secondItem = _.find(task?.task?.match_corresponding_answers, [ 'id', item.userSecondAnswerId ]);

          if (!_.isEmpty(firstItem) && !_.isEmpty(secondItem)) {
            tempPair.push({
              id: index,
              pair: [
                { id: firstItem?.id || Math.random(), content: firstItem?.content || '' },
                { id: secondItem?.id || Math.random(), content: secondItem?.content || '' } ]
            });
          }
        }
      )

      this.setState({
        ...initialState,
        isTaken: isTakenTemp,
        isEmptyQuiz: isEmptyQuizTemp,
        isCorrect: isCorrectTemp,
        inputTextArea: task?.user_constructed_question_answer?.answer || '',
        matchingSequence: newMatchSequnce || [],
        radioValue: task?.user_selected_question_answer?.answers[ INT_ZERO ]?.choiceId || 0,
        multipleChoices: task?.user_selected_question_answer?.answers.map(item => item.choiceId) || [],

        matchingCorespondingData: columnMatchCorresponding,
        matchingCorespondingDataSource: columnMatchCorresponding,
        matchingSequencePairs: tempPair || [],
      })

    }

    if (!_.isEqual(prevState.isEdit, this.state.isEdit)) {
      const { task } = this.props;
      switch (task?.task?.typeId) {
        case TaskCategory.MATCH_CORESPONSE:
          this.setState({
            matchingSequencePairs: initialState.matchingSequencePairs
          })
          break;
        default: break;
      }
    }

    if (!_.isEqual(prevState.pairIds, this.state.pairIds)) {
      const { pairIds, matchingCorespondingData, matchingSequencePairs } = this.state;
      if (pairIds.length === 2) {
        const firstItem = _.find(matchingCorespondingData[ 0 ], [ 'id', pairIds[ 0 ] ]);
        const secondItem = _.find(matchingCorespondingData[ 1 ], [ 'id', pairIds[ 1 ] ]);
        if (firstItem && secondItem) {
          const newPair = {
            id: matchingSequencePairs.length,
            pair: [ firstItem, secondItem ]
          }

          let prevPairs = _.cloneDeep(matchingSequencePairs);
          prevPairs.push(newPair);

          const newColumn1 = _.filter(matchingCorespondingData[ INT_ZERO ], item => item.id !== firstItem.id);
          const newColumn2 = _.filter(matchingCorespondingData[ INT_ONE ], item => item.id !== secondItem.id);

          const newMatchingCorespondData = _.cloneDeep(this.state.matchingCorespondingData);
          newMatchingCorespondData[ INT_ZERO ] = newColumn1;
          newMatchingCorespondData[ INT_ONE ] = newColumn2;

          this.setState({
            matchingSequencePairs: prevPairs,
            pairIds: Array(2).fill(null),
            matchingCorespondingData: newMatchingCorespondData
          });
        }
      }
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
  }

  private _onChangeTextArea({ target }: any) {
    this.setState({ inputTextArea: target.value });
  }

  private _onChangeBinaryChoices(e: any) {
    const { value } = e.target;

    if (value) {

      const tempState = _.filter(this.state.binaryChoices, item => item.id !== value.id);

      let binaryChoices = [ ...tempState, JSON.parse(value) ];

      this.setState({ binaryChoices: binaryChoices });
    }
  }

  private _onDragEnd = ({ destination, source }: DropResult) => {
    // dropped outside the list
    if (!destination) return;

    const newItems = reorder(this.state.matchingSequence, source.index, destination.index);
    this.setState({ matchingSequence: newItems })
  };

  private _onChooseNewPair = ({ item, column }: { item: any, column: number }) => {

    this.setState((state) => {
      const newPair = _.cloneDeep(this.state.pairIds);
      newPair[ column ] = item.id;

      return {
        pairIds: newPair
      }
    });
  }

  private _onRemovePair = ({ pairId }: { pairId: number }) => {
    const tempPair = _.find(this.state.matchingSequencePairs, [ 'id', pairId ]);
    if (!_.isEmpty(tempPair)) {
      const id0 = tempPair?.pair[ INT_ZERO ].id;
      const id1 = tempPair?.pair[ 1 ].id;

      const itemColumn0 = _.find(this.state.matchingCorespondingDataSource[ INT_ZERO ], [ 'id', id0 ]);
      const itemColumn1 = _.find(this.state.matchingCorespondingDataSource[ 1 ], [ 'id', id1 ]);

      const newColumn1 = [ ...this.state.matchingCorespondingData[ INT_ZERO ], itemColumn0 ];
      const newColumn2 = [ ...this.state.matchingCorespondingData[ 1 ], itemColumn1 ];

      const newMatchingCorespondData = _.cloneDeep(this.state.matchingCorespondingData);
      newMatchingCorespondData[ INT_ZERO ] = newColumn1;
      newMatchingCorespondData[ 1 ] = newColumn2;

      this.setState({ matchingCorespondingData: newMatchingCorespondData, matchingSequencePairs: _.filter(this.state.matchingSequencePairs, item => item.id !== pairId) });
    }
  }

  private _onChangeFile = (info: any) => {
    const file = info.file;
    !isEmpty(file) && this.setState({ selectedFiles: [ file ] });
  }

  private _onDropFile = (e: any) => {
    const file = e.dataTransfer.files[ 0 ];
    !isEmpty(file) && this.setState({ selectedFiles: [ file ] });
  }

  private _onRemoveFile = () => {
    this.setState({ selectedFiles: [] });
  }

  private _onSubmitTask = async () => {
    const {
      task,
      doSubmitBinaryQuestion,
      doSubmitContructedQuestion,
      doSubmitSelectedQuestionAnswer,
      doSubmitMatchingSequenceQuestion,
      doSubmitMatchingCorrespondingQuestion,
      doSubmitAssignment,
      doSubmitDocument,

      onFetchQuestionAnswer,

      doUpdateSubmitBinaryQuestion,
      doUpdateSubmitContructedQuestion,
      doUpdateSubmitSelectedQuestionAnswer,
      doUpdateMatchingSequenceQuestion,
      doUpdateMatchingCorrespondingQuestion,
    } = this.props;

    const {
      inputTextArea,
      multipleChoices,
      radioValue,
      binaryChoices,
      matchingSequence,
      matchingSequencePairs,
      selectedFiles,
    } = this.state;

    let payload = {};
    const taskId = get(task, 'taskId');
    try {
      switch (task?.task?.typeId) {
        case TaskCategory.SINGLE_CHOICE:
          if (radioValue) {

            payload = {
              answers: [
                { choiceId: radioValue }
              ]
            };
            if (_.isEmpty(task.user_selected_question_answer)) {
              await doSubmitSelectedQuestionAnswer({ answers: payload, taskId });
            } else {
              await doUpdateSubmitSelectedQuestionAnswer({ answers: payload, taskId });
            }
          }
          break;

        case TaskCategory.MULTIPLE_CHOICES:
          if (!_.isEmpty(multipleChoices)) {
            let mapResult: { choiceId: number; }[] = [];
            _.forEach(multipleChoices, function (value) {
              mapResult.push({
                choiceId: value
              })
            })
            let payload = {
              answers: [ ...mapResult ]
            };
            if (_.isEmpty(task.user_selected_question_answer)) {
              await doSubmitSelectedQuestionAnswer({ answers: payload, taskId });
            } else {
              await doUpdateSubmitSelectedQuestionAnswer({ answers: payload, taskId });
            }
          }
          break;

        case TaskCategory.WRITTING:
          if (!_.isEmpty(inputTextArea)) {

            payload = { answer: inputTextArea };
            if (_.isEmpty(task.user_constructed_question_answer)) {
              await doSubmitContructedQuestion({ answers: payload, taskId });
            } else {
              await doUpdateSubmitContructedQuestion({ answers: payload, taskId });
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
              answers: [ ...uploadValue ]
            }
            if (_.isEmpty(task?.user_true_false_question_answer)) {
              await doSubmitBinaryQuestion({ answers: payload, taskId });
            } else {
              await doUpdateSubmitBinaryQuestion({ answers: payload, taskId });
            }
          }
          break;

        case TaskCategory.MATCH_SEQUENCE:
          if (!_.isEmpty(matchingSequence)) {
            let uploadValue: { optionId: number; index: number; }[] = [];

            uploadValue = _.map(matchingSequence, (value, index) => {
              return {
                index,
                optionId: value.id
              }
            });

            payload = {
              answers: [ ...uploadValue ]
            }

            if (_.isEmpty(task?.user_match_sequence_answer)) {
              await doSubmitMatchingSequenceQuestion({ answers: payload, taskId });
            } else {
              await doUpdateMatchingSequenceQuestion({ answers: payload, taskId });
            }
          }
          break;
        case TaskCategory.MATCH_CORESPONSE:
          if (!_.isEmpty(matchingSequencePairs)) {
            let uploadValue: { firstAnswerId: number; secondAnswerId: number; }[] = [];

            uploadValue = _.map(matchingSequencePairs, pairs => {
              return {
                firstAnswerId: pairs.pair[ INT_ZERO ].id,
                secondAnswerId: pairs.pair[ 1 ].id
              }
            });

            payload = {
              answers: [ ...uploadValue ]
            }

            if (_.isEmpty(task?.user_match_corresponding_answer)) {
              await doSubmitMatchingCorrespondingQuestion({ answers: payload, taskId });
            } else {
              await doUpdateMatchingCorrespondingQuestion({ answers: payload, taskId });
            }
          }
          break;
        case TaskCategory.ASSIGNMENT:
          if (!isEmpty(selectedFiles)) {
            await doSubmitAssignment({ taskId, answers: selectedFiles[ 0 ] });
          }
          break;
        case TaskCategory.DOCUMENT:
          await doSubmitDocument({ taskId });
        default:
          break;
      }
      await onFetchQuestionAnswer({ checklistId: task?.task?.checklistId, taskId });
    } catch (error) {

    }
    this.setState({ isEdit: false });
    //this.setState(initialState);
  }

  private _onRetakeTask = () => {
    this.setState({
      isEdit: true
    })
  }

  private _renderTaskContent() {
    const { task, isLoading } = this.props;
    const {
      binaryChoices,
      multipleChoices,
      isEdit, isTaken,
      inputTextArea,
      matchingSequence,
      pairIds,
      matchingCorespondingData,
      matchingSequencePairs,
      selectedFiles,
    } = this.state;
    if (isLoading) {
      return <Skeleton active={true} />
    }
    if (!_.isEmpty(task)) {

      switch (task?.task?.typeId) {
        case TaskCategory.DOCUMENT:
          return <>
            <Title> {task?.task?.document?.title}</Title>
            <div className='taskitem--document__html' id='taskitem--document__html'>
              Alo 123123</div>
          </>;
        case TaskCategory.ASSIGNMENT:
          const props = {
            name: 'file',
            multiple: false,
            showUploadList: false,

            beforeUpload(file: any) {
              /*  const isValid = file.type === 'application/pdf';
               if (!isValid) {
                 message.error(`${file.name} is not a valid file`);
               } */
              return false;
            }
          };
          return <>
            <Title> {task?.task?.assignment?.title}</Title>
            <Typography>Please read the files below: </Typography>
            {!isEmpty(task?.task?.assignment?.fileList) && _.map(task?.task?.assignment?.fileList, file => {
              return <div className='mt-large'>
                <Card className='mt-medium mb-medium' size='small'>
                  <div className='taskitem--assignment__card-body'>
                    <a href={file.presignUrl} target='_blank' style={{ width: '100%', marginBottom: '0px' }} rel="noreferrer">{file.fileName}</a>
                  </div>
                </Card>
              </div>
            })}
            {!isTaken || isEdit && <Dragger {...props} onChange={this._onChangeFile} onDrop={this._onDropFile}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                {task?.task?.assignment?.description}
              </p>
              <p className="ant-upload-hint">
                Please submit your assignemt before {new Date(task?.task?.assignment?.dueDate).toLocaleString()}
              </p>

            </Dragger>}
            {!isEmpty(selectedFiles) && <div className='mt-large'>
              <Card className='mt-medium' size='small'>
                <div className='taskitem--assignment__card-body'>
                  <p style={{ width: '100%', marginBottom: '0px' }}>{selectedFiles[ 0 ].name}</p>
                  <CloseOutlined className='close-badge' color='action' onClick={this._onRemoveFile} />
                </div>
              </Card>
            </div>}
            {isTaken && <div>
              <Title level={3}>Status assignment</Title>
              <InlineValue title='Status assignment' value='Submited.' />
              <InlineValue title='Time remaining' value='2 hours' />
              <InlineValue title='Lastest modify at' value={(new Date()).toDateString()} />
              <InlineValue title='Your assignment' value={<a target='_blank' href={task?.task?.assignment?.fileList[ 0 ].presignUrl} rel="noreferrer">{task?.task?.assignment?.fileList[ 0 ].keyFileName}</a>} />
            </div>}
          </>;
        case TaskCategory.MULTIPLE_CHOICES:
          return <MultipleChoices
            isEdit={isEdit}
            isTaken={isTaken}
            task={task.task}
            multipleChoices={multipleChoices}
            _onChangeMultipleChoices={this._onChangeMultipleChoices.bind(this)}
          />;
        case TaskCategory.SINGLE_CHOICE:
          const { radioValue } = this.state;
          /*  const userSingleAnswer = task?.answersSelectedQuestion?.answers ? task.answersSelectedQuestion.answers[0]?.choiceId : radioValue;
           const singleCurrentAppliedValue = (isEdit || !isEdit && !isTaken) ? radioValue : userSingleAnswer; */
          return <SingleChoice
            isEdit={isEdit}
            isTaken={isTaken}
            task={task.task}
            radioValue={radioValue}
            _onChangeSingleChoice={this._onChangeSingleChoice.bind(this)}
          />;
        case TaskCategory.WRITTING:

          return <>
            <TextArea disabled={!isEdit && isTaken}
              value={/* !isEdit ? task?.answerConstructedQuestion?.answer : */ inputTextArea}
              onChange={this._onChangeTextArea.bind(this)}
              placeholder={_.isEmpty(task?.task?.constructed_question_answer?.sampleAnswer) ? "Feel free to text." : task?.task?.constructed_question_answer?.sampleAnswer}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </>;
        case TaskCategory.BINARY:

          return <BinaryQuiz
            isEdit={isEdit}
            isTaken={isTaken}
            task={task?.task}
            answerBinaryQuestion={task?.user_true_false_question_answer}
            binaryChoices={binaryChoices}
            onChangeBinaryChoices={this._onChangeBinaryChoices.bind(this)}
          />;

        case TaskCategory.MATCH_SEQUENCE:
          return <>
            <MatchSequence
              items={matchingSequence}
              isTaken={isTaken}
              isEdit={isEdit}
              onDragEnd={this._onDragEnd.bind(this)} />
          </>;

        case TaskCategory.MATCH_CORESPONSE:
          return <MatchCorrespond
            isEdit={isEdit}
            isTaken={isTaken}
            matchingCorespondingData={matchingCorespondingData}
            matchingSequencePairs={matchingSequencePairs}
            pairIds={pairIds}
            onChooseNewPair={this._onChooseNewPair.bind(this)}
            onRemovePair={this._onRemovePair.bind(this)}
          />;

        default:
          break;
      }
    } else {
      return <EmptyResult message='Task will be displayed here.' />;
    }

  }

  render() {
    const { task, isLoading, isFetchingAnswer, isSubmitingAnswer } = this.props;
    const { isTaken, isEmptyQuiz, isEdit, isCorrect } = this.state;
    return (
      <div>
        {
          (isLoading || isFetchingAnswer) ? <Skeleton active={true} /> :
            <>
              <Title>{task?.task?.quiz?.question}</Title>
              <br></br>
              <Space direction="vertical" style={{ width: '100%', gap: '0px' }}>
                {!isEmptyQuiz ?
                  this._renderTaskContent() :
                  <EmptyResult message='Opps! Waiting for the mentor to create the content for this question.' />}
                {!_.includes([ TaskCategory.WRITTING, TaskCategory.DOCUMENT ], task?.task?.typeId) && isTaken && isCorrect && !isEdit ? <Text type='success'>Your anwser is correct.</Text> : ''}
                {!_.includes([ TaskCategory.WRITTING, TaskCategory.DOCUMENT ], task?.task?.typeId) && isTaken && !isCorrect && !isEdit ? <Text type='danger'>Your anwser is incorrect.</Text> : ''}
                <Space direction="horizontal">
                  {(!_.isEmpty(task) && !isEmptyQuiz && !isTaken || isTaken && isEdit) && <Button type='primary' className='mt-medium mr-medium' loading={isSubmitingAnswer} onClick={this._onSubmitTask}>Submit</Button>}
                  {isTaken && !isEdit && !_.includes([ TaskCategory.DOCUMENT ], task?.task?.typeId) ? <Button type='ghost' className='mt-medium' onClick={this._onRetakeTask}>Retake</Button> : ''}
                </Space>
              </Space>
            </>
        }

      </div>
    )
  }
}

export default TaskItem;