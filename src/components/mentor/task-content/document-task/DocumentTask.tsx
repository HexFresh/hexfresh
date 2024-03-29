import React, { useEffect, useRef, useState } from 'react';
import JoditReact from 'jodit-react-ts';
import 'jodit/build/jodit.min.css';
import { CircularProgress } from '@mui/material';
import {
  getDocument,
  createEmptyDocument,
  createFileInDocument,
  deleteFileInDocument,
  updateDocument,
} from '../../../../api/mentor/DocumentTaskApi';
import './document-task.css';
import { Button, message, Popconfirm } from 'antd';
import { UploadOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

interface IDocument {
  id: number;
  document: string;
  fileList: IFile[];
  taskId: number;
  title: string;
}

interface IFile {
  fileName: string;
  keyFileName: string;
  signedUrl: string;
  expiredTime: string;
}

const cutString = (str: string) => {
  if (str.length > 30) {
    return str.slice(0, 30) + '...';
  }
  return str;
};

function DocumentTask(props: any) {
  const { task } = props;
  const [value, setValue] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState<IDocument | null>(null);
  const temp = useRef<HTMLInputElement>(null);

  const fetchDocument = async () => {
    const document = await getDocument(task.id);
    if (document === null) {
      await createEmptyDocument(task.id);
      fetchDocument();
    } else {
      setDocument(document);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchDocument();
      setIsLoading(false);
    };
    fetchData();
  }, [task.id]);

  const config = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
    toolbarButtonSize: 'middle',
    theme: 'default',
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: true,
    triggerChangeEvent: true,
    height: '100%',
    direction: 'ltr',
    language: 'en',
    debugLanguage: false,
    i18n: 'en',
    tabIndex: -1,
    toolbar: true,
    enter: 'P',
    useSplitMode: true,
    colorPickerDefaultTab: 'background',
    imageDefaultWidth: 100,
    removeButtons: ['source', 'print', 'about'],
    disablePlugins: ['paste', 'stat'],
    events: {},
    textIcons: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    placeholder: '',
    showXPathInStatusbar: true,
  };

  const createNewFile = async (file: any) => {
    message.loading('Uploading...').then(async () => {
      const result = await createFileInDocument(task.id, file.name);
      if (result) {
        const url = result.signedUrl;
        let headers = new Headers();
        headers.append('Content-Type', `${file.type}`);
        headers.append('Accept', `${file.type}`);

        const newResponse = await fetch(url, {
          method: 'PUT',
          body: file,
          headers,
          mode: 'cors',
        });
        if (newResponse.ok) {
          await fetchDocument();
          message.success('Uploaded', 0.5);
        } else {
          message.error('Error', 0.5);
        }
      }
    });
  };
  const handleDeleteFile = async (id: number) => {
    const result = await deleteFileInDocument(task.id, id);
    if (result === '') {
      message.success('Delete file success');
      await fetchDocument();
    } else {
      message.error('Delete failed');
    }
  };

  const handleUpdateDocument = () => {
    const newDocument = {
      title: '',
      document: value,
    };

    const update = async () => {
      message.loading('Updating...').then(async () => {
        const result = await updateDocument(task.id, newDocument);
        if (result) {
          message.success('Updated', 0.5);
        } else {
          message.error('Update failed', 0.5);
        }
      });
    };

    update();
  };

  return (
    <div className="document-task">
      {isLoading ? (
        <CircularProgress className="circular-progress" />
      ) : (
        <div className="document-task__container">
          <div className="left">
            <JoditReact
              config={config}
              defaultValue={document?.document || '<div></div>'}
              onChange={(content: string) => setValue(content)}
            />
          </div>
          <div className="right">
            <Button icon={<SaveOutlined />} className="save-btn" onClick={() => handleUpdateDocument()}>
              Save document
            </Button>
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
              {document?.fileList?.map((file: any, index: number) => {
                return (
                  <div key={index} className="file-item">
                    <div className="file-item-name">{cutString(file.fileName)}</div>
                    <Popconfirm
                      className="delete-file"
                      placement="topLeft"
                      title="Are you sure to delete this file?"
                      okText="Yes"
                      onConfirm={() => handleDeleteFile(file.id)}
                      cancelText="No"
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentTask;
