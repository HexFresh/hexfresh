import React, { useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { CircularProgress } from '@mui/material';
import './document-task.css';

function DocumentTask(props: any) {
  const { task } = props;
  const [editorState, setEditorState] = React.useState<EditorState>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [html, setHtml] = React.useState('');

  useEffect(() => {
    if (editorState) {
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      setHtml(html);
    }
  }, [editorState]);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const handleUpdate = () => {
    console.log('handleUpdate');
  };

  return (
    <div className="document-task">
      {isLoading ? (
        <CircularProgress className="circular-progress" />
      ) : (
        <div className="document-task__container">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
            onBlur={handleUpdate}
          />
        </div>
      )}
    </div>
  );
}

export default DocumentTask;
