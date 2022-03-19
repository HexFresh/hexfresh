import React, { Component } from 'react'
import { ITask } from '../../interface/program-interface'
import { TaskCategory } from '../../utilities/enum-utils';

import { message, Radio, Space, Checkbox, Button, List } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import Dragger from 'antd/lib/upload/Dragger';
import TextArea from 'antd/lib/input/TextArea';

import _ from 'lodash';

interface ITaskItemProps {
  task: ITask | null;
  doSubmitTask: any;
}

interface ITaskItemState {
  radioValue: number;
  selectedFiles: File[];
  multipleChoices: string[];
  inputTextArea: string;
  binaryChoices: Map<string, string>;
}

export class TaskItem extends Component<ITaskItemProps, ITaskItemState> {

  state = {
    radioValue: 0,
    selectedFiles: [],
    multipleChoices: [],
    inputTextArea: '',
    binaryChoices: new Map(),
  };

  componentDidMount() {

  }

  componentDidUpdate() {

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
      const binaryValue = value[0];
      const key = _.slice(value, 1).toString();
      console.log(key, binaryValue);

      let binaryChoices = new Map<string, string>(this.state.binaryChoices);

      console.log(binaryChoices);

      binaryChoices.set(key, binaryValue);
      this.setState({ binaryChoices: binaryChoices });
      console.log(this.state.binaryChoices, 'binary choice');
    }
  }

  private _onSubmitTask = () => {
    const { task, doSubmitTask } = this.props;
    const { inputTextArea, multipleChoices, radioValue, selectedFiles } = this.state;
    const payload = {
      taskId: task?.id,
      inputTextArea,
      multipleChoices,
      radioValue,
      selectedFiles,
    }
    doSubmitTask(payload);
  }

  private _onRetakeTask = () => {

  }

  private _renderTaskContent() {
    const { task } = this.props;
    const { binaryChoices } = this.state;
    if (task) {
      switch (task.type) {
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
            <Checkbox.Group style={{ width: '100%' }} onChange={this._onChangeMultipleChoices.bind(this)}>
              <Space direction="vertical">
                {task.choices && _.map(
                  task.choices,
                  choice => <Checkbox key={choice.choiceId} value={choice.choiceId}>{choice.content}</Checkbox>
                )}
              </Space>
            </Checkbox.Group>
          </>;
        case TaskCategory.SINGLE_CHOICE:
          const { radioValue } = this.state;
          return <>
            <Radio.Group style={{ width: '100%' }} onChange={this._onChangeSingleChoice.bind(this)} value={radioValue}>
              <Space direction="vertical">
                {task.choices && _.map(
                  task.choices,
                  choice => <Radio key={choice.choiceId} value={choice.choiceId}>{choice.content}</Radio>
                )}
              </Space>
            </Radio.Group></>;
        case TaskCategory.WRITTING:

          return <>
            <TextArea
              value={_.isEmpty(this.state.inputTextArea) ? task.content : this.state.inputTextArea}
              onChange={this._onChangeTextArea.bind(this)}
              placeholder="Enter your anwser here."
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
              dataSource={task.binarylist}
              renderItem={item => <List.Item >
                <Space direction="horizontal">
                  <Radio.Group style={{ width: '100%' }} onChange={this._onChangeBinaryChoices.bind(this)} value={binaryChoices.get(item.id)+item.id}>
                    <Space direction="horizontal">
                      <Radio className='ml-small' key={'1' + item.id} value={'1' + item.id}></Radio>
                      <Radio className='ml-small' key={'0' + item.id} value={'0' + item.id}></Radio>
                    </Space>
                  </Radio.Group>
                  {item.content}
                </Space>
              </List.Item>}
            />

          </>;
        default:
          break;
      }
    } else {
      return <Title>Task is not found</Title>;
    }

  }

  render() {
    const { task } = this.props
    return (
      <div>
        <Title>{task?.name}</Title>
        <br></br>
        {this._renderTaskContent()}
        <Space direction="vertical">
          <Text type='success'>Your anwser is correct.</Text>
          <Text type='danger'>Your anwser is incorrect.</Text>
          <Space direction="horizontal">
            <Button type='primary' className='mt-medium mr-medium'>Submit</Button>
            <Button type='ghost' className='mt-medium'>Retake</Button>
          </Space>

        </Space>
      </div>
    )
  }
}

export default TaskItem