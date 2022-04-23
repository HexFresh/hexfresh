import React, { Component } from 'react'
import _ from 'lodash';
import 'antd/dist/antd.css';
import { message, Space, Button, Skeleton } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Dragger from 'antd/lib/upload/Dragger';
import TextArea from 'antd/lib/input/TextArea';

import { EmptyResult } from '../results';
import { ICorrespondingTassk, ISequenceTask, ITask } from '../../interface/program-interface'
import { TaskCategory } from '../../utilities/enum-utils';
import './taskitem.scss';
import { DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../utilities/helpers';
import { MatchSequence } from './match-sequence/MatchSequence';
import { SingleChoice } from './single-choice-quiz/SingleChoice';
import { MultipleChoices } from './multiple-task/MultipleChoices';
import { BinaryQuiz } from './binary-quiz/BinaryQuiz';
import { INT_ONE, INT_TWO, INT_ZERO } from '../../constant';
import { MatchCorrespond } from './match-corresponding/MatchCorrespond';
import { isTrueAnswer } from './match-corresponding/match-correspoding.util';

export interface IMatchingSequencePair {
  id: number;
  pair: { id: number, content: string }[];
}
interface ITaskItemProps {
  task: ITask | null;
  isLoading: boolean;
  isFetchingAnswer: boolean;
  isSubmitingAnswer: boolean;
  doSubmitSelectedQuestionAnswer: any;
  doSubmitContructedQuestion: any;
  doSubmitBinaryQuestion: any;
  doSubmitMatchingSequenceQuestion: any;
  doSubmitMatchingCorrespondingQuestion: any;
  onFetchQuestionAnswer: any;
  doUpdateSubmitBinaryQuestion: any;
  doUpdateSubmitContructedQuestion: any;
  doUpdateSubmitSelectedQuestionAnswer: any;
  doUpdateMatchingSequenceQuestion: any;
  doUpdateMatchingCorrespondingQuestion: any;
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
    this.setState({ matchingSequence: this.props.task?.match_sequence_options || [] });
  }

  componentDidUpdate(prevProps: ITaskItemProps, prevState: ITaskItemState) {

    if (!_.isEqual(prevProps.task, this.props.task)) {
      const { task } = this.props;

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
              if (task.answersSelectedQuestion.answers[ INT_ZERO ].choiceAnswer) {

                isCorrectTemp = true;
              }
            } else {
              if (!_.some(task.answersSelectedQuestion.answers, false) || !_.some(task.answersSelectedQuestion.answers, [ 'choiceAnswer', null ])) {
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
            const userAnswer = _.map(task.answerBinaryQuestion.answers, answer => answer.userAnswer);
            const optionAnswer = _.map(task.answerBinaryQuestion.answers, answer => answer.optionAnswer
            );
            if (_.isEqual(userAnswer, optionAnswer)) {
              isCorrectTemp = true;
            }
          } else {
            isTakenTemp = false;
          };

          if (_.isEmpty(task.true_false_question_options)) {
            isEmptyQuizTemp = true;
          } else {
            isEmptyQuizTemp = false;
          }
          break;

        case TaskCategory.MATCH_SEQUENCE:
          if (!_.isEmpty(task.answerMatchingSequenceQuestion)) {
            isTakenTemp = true;
            const userAnswer = _.map(task.answerMatchingSequenceQuestion.answers, answer => answer.userAnswer);
            const optionAnswer = _.map(task.answerMatchingSequenceQuestion.answers, answer => answer.optionIndexAnswer);

            if (_.isEqual(userAnswer, optionAnswer)) {
              isCorrectTemp = true;
            }

          } else {
            isTakenTemp = false;
          };

          if (_.isEmpty(task.match_sequence_options)) {
            isEmptyQuizTemp = true;
          } else {
            isEmptyQuizTemp = false;
          }
          break;

        case TaskCategory.MATCH_CORESPONSE:
          if (!_.isEmpty(task.answerMatchingCorrespondingQuestion)) {
            isTakenTemp = true;

            isCorrectTemp = isTrueAnswer({ answers: task.answerMatchingCorrespondingQuestion.answers });
          } else {
            isTakenTemp = false;
          };

          if (_.isEmpty(task.match_corresponding_answers)) {
            isEmptyQuizTemp = true;
          } else {
            isEmptyQuizTemp = false;
          }
          break;
        default:
          break;
      }
      const sortedSequence = _.sortBy(task?.answerMatchingSequenceQuestion?.answers, [ 'userAnswer' ]);
      const newMatchSequnce = !_.isEmpty(sortedSequence) ? _.map(
        sortedSequence,
        item => {
          return {
            id: item.optionId,
            content: _.find(task?.match_sequence_options, option => option.id === item.optionId)?.content || ''
          }
        }) : task?.match_sequence_options;

      // calculate for matching corresponding answer content
      const columnMatchCorresponding = Array(2).fill([]);
      const firstColumn: { id: number; content: string; }[] = [];
      const secondColumn: { id: number; content: string; }[] = [];
      _.forEach(
        task?.match_corresponding_answers,
        item => {
          const tempValue = {
            id: item.id,
            content: item.content
          }
          console.log(item);
          item.index === INT_ONE && firstColumn.push(tempValue);
          item.index === INT_TWO && secondColumn.push(tempValue);
        }
      );
      columnMatchCorresponding[ INT_ZERO ] = firstColumn;
      columnMatchCorresponding[ INT_ONE ] = secondColumn;

      //calculate for user answer
      const tempPair: { id: number; pair: { id: number, content: string }[]; }[] = [];
      _.forEach(
        task?.answerMatchingCorrespondingQuestion?.answers,
        (item, index) => {
          const firstItem = _.find(task?.match_corresponding_answers, [ 'id', item.userFisrtAnswerId ]);
          const secondItem = _.find(task?.match_corresponding_answers, [ 'id', item.userSecondAnswerId ]);

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
        inputTextArea: task?.answerConstructedQuestion?.answer || '',
        matchingSequence: newMatchSequnce || [],
        radioValue: task?.answersSelectedQuestion?.answers[ INT_ZERO ]?.choiceId || 0,
        multipleChoices: task?.answersSelectedQuestion?.answers.map(item => item.choiceId) || [],

        matchingCorespondingData: columnMatchCorresponding,
        matchingCorespondingDataSource: columnMatchCorresponding,
        matchingSequencePairs: tempPair || [],
      })

    }

    if (!_.isEqual(prevState.isEdit, this.state.isEdit)) {
      const { task } = this.props;
      switch (task?.typeId) {
        case TaskCategory.MATCH_CORESPONSE:
          this.setState({
            matchingSequencePairs: initialState.matchingSequencePairs
          })
          break;
        default: break;
      }
    }

    if (!_.isEqual(prevState.pairIds, this.state.pairIds)) {
      console.log(123123123123);
      const { pairIds, matchingCorespondingData, matchingSequencePairs } = this.state;
      if (pairIds.length === 2) {
        const firstItem = _.find(matchingCorespondingData[ 0 ], [ 'id', pairIds[ 0 ] ]);
        const secondItem = _.find(matchingCorespondingData[ 1 ], [ 'id', pairIds[ 1 ] ]);
        console.log(firstItem, secondItem);
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
      console.log(newPair);

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

  private _onSubmitTask = async () => {
    const {
      task,
      doSubmitBinaryQuestion,
      doSubmitContructedQuestion,
      doSubmitSelectedQuestionAnswer,
      doSubmitMatchingSequenceQuestion,
      doSubmitMatchingCorrespondingQuestion,
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
    } = this.state;

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
              await doSubmitSelectedQuestionAnswer({ answers: payload, taskId: task.id });
            } else {
              await doUpdateSubmitSelectedQuestionAnswer({ answers: payload, taskId: task.id });
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
            console.log(payload, 'payload');
            if (_.isEmpty(task.answersSelectedQuestion)) {
              await doSubmitSelectedQuestionAnswer({ answers: payload, taskId: task.id });
            } else {
              await doUpdateSubmitSelectedQuestionAnswer({ answers: payload, taskId: task.id });
            }
          }
          break;

        case TaskCategory.WRITTING:
          if (!_.isEmpty(inputTextArea)) {

            payload = { answer: inputTextArea };
            console.log(payload, 'payload');
            if (_.isEmpty(task.answerConstructedQuestion)) {
              await doSubmitContructedQuestion({ answers: payload, taskId: task.id });
            } else {
              await doUpdateSubmitContructedQuestion({ answers: payload, taskId: task.id });
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
            console.log(payload, 'payload');
            if (_.isEmpty(task?.answerBinaryQuestion)) {
              await doSubmitBinaryQuestion({ answers: payload, taskId: task.id });
            } else {
              await doUpdateSubmitBinaryQuestion({ answers: payload, taskId: task.id });
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

            if (_.isEmpty(task?.answerMatchingSequenceQuestion)) {
              await doSubmitMatchingSequenceQuestion({ answers: payload, taskId: task.id });
            } else {
              await doUpdateMatchingSequenceQuestion({ answers: payload, taskId: task.id });
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

            if (_.isEmpty(task?.answerMatchingCorrespondingQuestion)) {
              await doSubmitMatchingCorrespondingQuestion({ answers: payload, taskId: task.id });
            } else {
              await doUpdateMatchingCorrespondingQuestion({ answers: payload, taskId: task.id });
            }
          }
          break;
        default:
          break;
      }
      await onFetchQuestionAnswer(task);
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
      matchingSequencePairs
    } = this.state;
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
          return <MultipleChoices
            isEdit={isEdit}
            isTaken={isTaken}
            task={task}
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
            task={task}
            radioValue={radioValue}
            _onChangeSingleChoice={this._onChangeSingleChoice.bind(this)}
          />;
        case TaskCategory.WRITTING:

          return <>
            <TextArea disabled={!isEdit && isTaken}
              value={/* !isEdit ? task?.answerConstructedQuestion?.answer : */ inputTextArea}
              onChange={this._onChangeTextArea.bind(this)}
              placeholder={_.isEmpty(task.constructed_question_answer?.sampleAnswer) ? "Feel free to text." : task.constructed_question_answer?.sampleAnswer}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </>;
        case TaskCategory.BINARY:

          return <BinaryQuiz 
            isEdit={isEdit}
            isTaken={isTaken}
            task={task}
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
              <Title>{task?.quiz?.question}</Title>
              <br></br>
              {!isEmptyQuiz ?
                this._renderTaskContent() :
                <EmptyResult message='Opps! Waiting for the mentor to create the content for this question.' />}
              {this.state.displayActionButtonGroup &&
                <Space direction="vertical">
                  {task?.typeId !== TaskCategory.WRITTING && isTaken && isCorrect && !isEdit ? <Text type='success'>Your anwser is correct.</Text> : ''}
                  {task?.typeId !== TaskCategory.WRITTING && isTaken && !isCorrect && !isEdit ? <Text type='danger'>Your anwser is incorrect.</Text> : ''}
                  <Space direction="horizontal">
                    {(!_.isEmpty(task) && !isEmptyQuiz && !isTaken || isTaken && isEdit) && <Button type='primary' className='mt-medium mr-medium' loading={isSubmitingAnswer} onClick={this._onSubmitTask}>Submit</Button>}
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