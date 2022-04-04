import React, { useEffect } from 'react';
import JoditReact from 'jodit-react-ts';
import 'jodit/build/jodit.min.css';
import { CircularProgress } from '@mui/material';
import {
  getDocument,
  createEmptyDocument,
} from '../../../../api/mentor/DocumentTaskApi';
import './document-task.css';

function DocumentTask(props: any) {
  const { task } = props;
  const [value, setValue] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState(false);

  console.log(value);

  const fetchDocument = async () => {
    setIsLoading(true);
    const document = await getDocument(task.id);
    console.log({ document });
    setIsLoading(false);
  };

  useEffect(() => {
    // fetchDocument();
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

  return (
    <div className="document-task">
      {isLoading ? (
        <CircularProgress className="circular-progress" />
      ) : (
        <div className="document-task__container">
          <JoditReact
            config={config}
            defaultValue={'<a>Hello</a>'}
            onChange={(content: string) => setValue(content)}
          />
        </div>
      )}
    </div>
  );
}

export default DocumentTask;
