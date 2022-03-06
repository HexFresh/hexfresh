import Title from 'antd/lib/typography/Title'
import React, { Component } from 'react'
import { ITask } from '../../interface/program-interface'
import { TaskCategory } from '../../utilities/enum-utils';
import { Upload, message, Radio, Space, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';

interface ITaskItemProps {
  task: ITask | null;
}

interface ITaskItemState {
  radioValue: number;
  selectedFiles: File[];

}

export class TaskItem extends Component<ITaskItemProps, ITaskItemState> {

  state = {
    radioValue: 1,
    selectedFiles: []
  };

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  private _onChangeSingleChoice(e: any) {
    console.log('radio checked', e.target.value);
    const {value} = e.target;
    console.log(value,'value');
    console.log(this,'this');
    if(value){
      this.setState({
        radioValue:value,
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

          </>;
        case TaskCategory.SINGLE_CHOICE:
          const { radioValue } = this.state;
          return <>
            <Radio.Group onChange={this._onChangeSingleChoice.bind(this)} value={radioValue}>
              <Space direction="vertical">
                <Radio value={1}>Option A</Radio>
                <Radio value={2}>Option B</Radio>
                <Radio value={3}>Option C</Radio>
                <Radio value={4}>
                  More...
                  {radioValue === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
                </Radio>
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