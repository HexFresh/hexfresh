import React, { useEffect, useRef, useState } from 'react';
import InputBase from '@mui/material/InputBase';
import { message, DatePicker, Button, Popconfirm, Tooltip } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { getTask, updatePointOfTask } from '../../../../api/mentor/taskApi';
import { CircularProgress } from '@mui/material';
import './assignment-task.css';
import {
  getAssignment,
  createEmptyAssignment,
  updateAssignment,
  createFileInAssignment,
  deleteFileInAssignment,
} from '../../../../api/mentor/AssignmentTaskApi';
import moment from 'moment';

interface IAssignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  fileList: IFile[];
  taskId: number;
}

interface IFile {
  fileName: string;
  keyFileName: string;
  signedUrl: string;
  expiredTime: string;
}

const dateFormat = 'YYYY-MM-DD';

function AssignmentTask(props: any) {
  const { task } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [assignment, setAssignment] = useState<IAssignment | null>(null);
  const [assignmentTask, setAssignmentTask] = useState<any>(null);
  const [point, setPoint] = useState<number>(0);
  const [assignmentTitle, setAssignmentTitle] = useState<string>('');
  const [assignmentDescription, setAssignmentDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const temp = useRef<HTMLInputElement>(null);

  const fetchTask = async (id: number) => {
    const result = await getTask(task.checklistId, id);
    setAssignmentTask(result);
    setPoint(result?.point);
  };

  const fetchAssignmentTask = async () => {
    const result = await getAssignment(task.id);
    if (result === null) {
      const resultCreate = await createEmptyAssignment(task.id);
      if (resultCreate) {
        await fetchAssignmentTask();
      }
    } else {
      setAssignment(result);
      setAssignmentTitle(result.title);
      setAssignmentDescription(result.description);
      setDueDate(result.dueDate);
    }
    console.log(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchTask(task.id);
      await fetchAssignmentTask();
      setIsLoading(false);
    };
    fetchData();
    return () => {};
  }, [task.id]);

  const handleUpdatePoint = (checklistId: number, taskId: number) => {
    const handleUpdate = async () => {
      await updatePointOfTask(checklistId, taskId, point);
      message.success('Updated', 0.5);
    };
    handleUpdate();
  };

  const handleUpdateAssignment = () => {
    if (assignmentTitle === '' || assignmentDescription === '' || dueDate === '') {
      message.error('Please fill all fields', 0.5);
      return;
    }

    if (
      assignmentTitle === assignment?.title &&
      assignmentDescription === assignment?.description &&
      dueDate === assignment?.dueDate
    ) {
      return;
    }

    const newAssignment = {
      title: assignmentTitle,
      description: assignmentDescription,
      dueDate,
    };
    console.log({ newAssignment });
    const handleUpdate = async () => {
      await updateAssignment(task.id, newAssignment);
      message.success('Updated', 0.5);
    };
    handleUpdate();
  };

  const onDateChange = (date: any, dateString: string) => {
    setDueDate(dateString);
  };

  const createNewFile = async (file: any) => {
    const result = await createFileInAssignment(task.id, file.name);
    if (result) {
      const url = result.signedUrl;
      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      file.arrayBuffer().then(async (arrayBuffer: any) => {
        const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
        const newResponse = await fetch(url, {
          method: 'PUT',
          body: blob,
          headers,
          mode: 'cors',
        });
        console.log(newResponse);
      });
    }
    await fetchAssignmentTask();
    message.success('Uploaded', 0.5);
    console.log(result);
  };

  const blobToBinary = async (blob: any) => {
    const buffer = await blob.arrayBuffer();

    const view = new Int8Array(buffer);

    return [...view].map((n) => n.toString(2)).join(' ');
  };

  const handleDeleteFile = async (id: number) => {
    const result = await deleteFileInAssignment(task.id, id);
    if (result === '') {
      message.success('Delete file success');
      await fetchAssignmentTask();
    } else {
      message.error('Delete failed');
    }
  };

  return (
    <div className="assignment-task-main">
      {isLoading ? (
        <CircularProgress />
      ) : (
        <div className="assignment-task">
          <InputBase
            multiline
            maxRows={10}
            className="assignment-task-title"
            sx={{
              width: '100%',
              fontSize: '24px',
              fontWeight: 'bold',
              marginTop: '20px',
            }}
            value={assignmentTitle || ''}
            onChange={(e) => setAssignmentTitle(e.target.value)}
            onBlur={handleUpdateAssignment}
            placeholder="Title"
          />
          <InputBase
            multiline
            maxRows={10}
            className="assignment-task-description"
            sx={{
              width: '100%',
              fontSize: '18px',
              marginTop: '20px',
            }}
            value={assignmentDescription || ''}
            onChange={(e) => setAssignmentDescription(e.target.value)}
            onBlur={handleUpdateAssignment}
            placeholder="Description"
          />
          <div
            style={{
              width: '100%',
              fontSize: '18px',
              marginTop: '20px',
              fontFamily: 'Arial',
              fontWeight: 'bold',
            }}
            className="due-date"
          >
            Due date
          </div>
          <DatePicker
            onBlur={handleUpdateAssignment}
            defaultValue={moment(dueDate || '2022-01-01', dateFormat)}
            onChange={onDateChange}
            format={dateFormat}
            placeholder="Due date"
            style={{
              width: '100%',
              marginTop: '5px',
            }}
          />
          <div className="upload-file">
            <div className="upload-file-left">List file</div>
            <div className="upload-file-right">
              <Button
                onClick={() => {
                  temp.current?.click();
                }}
                icon={<UploadOutlined />}
              >
                Click to Upload
              </Button>
              <input
                ref={temp}
                style={{ display: 'none' }}
                type="file"
                onChange={(event) => {
                  if (event.target.files) {
                    createNewFile(event.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          <div className="list-file">
            {assignment?.fileList?.map((file: any, index: number) => {
              return (
                <div key={index} className="file-item">
                  <div className="file-item-name">{file.fileName}</div>
                  <Popconfirm
                    placement="topLeft"
                    title="Are you sure to delete this file?"
                    okText="Yes"
                    onConfirm={() => handleDeleteFile(file.id)}
                    cancelText="No"
                  >
                    <Tooltip placement="top" title="Delete file">
                      <DeleteOutlined />
                    </Tooltip>
                  </Popconfirm>
                </div>
              );
            })}
          </div>

          <div className="task-point">
            <div className="task-point-title">Point:</div>
            <InputBase
              type="number"
              sx={{
                width: '100px',
                padding: '0 5px',
                fontSize: '18px',
                border: '1px solid #ccc',
              }}
              value={point ? point : 0}
              onChange={(e) => setPoint(Number(e.target.value))}
              onBlur={() => handleUpdatePoint(task.checklistId, task.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignmentTask;
