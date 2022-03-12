import Title from 'antd/lib/typography/Title'
import React, { Component } from 'react'
import { ITask } from '../../interface/program-interface'
import { TaskCategory } from '../../utilities/enum-utils';
import { Upload, message, Radio, Space, Input, Typography, Checkbox } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import _ from 'lodash';

interface ITaskItemProps {
  task: ITask | null;
}

interface ITaskItemState {
  radioValue: number;
  selectedFiles: File[];
  multipleChoices: string[];

}

export class TaskItem extends Component<ITaskItemProps, ITaskItemState> {

  state = {
    radioValue: 0,
    selectedFiles: [],
    multipleChoices: [],
  };

  componentDidMount() {

  }

  componentDidUpdate() {
    console.log(this.state.radioValue);
    console.log(this.state.multipleChoices);
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

  private _renderTaskContent() {
    const { task } = this.props;
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
            <Radio.Group onChange={this._onChangeSingleChoice.bind(this)} value={radioValue}>
              <Space direction="vertical">
                {task.choices && _.map(
                  task.choices,
                  choice => <Radio key={choice.choiceId} value={choice.choiceId}>{choice.content}</Radio>
                )}
              </Space>
            </Radio.Group></>;
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
      </div>
    )
  }
}

export default TaskItem