import React, {useEffect, useState} from 'react';
import './document-task-review.css';
import {CircularProgress} from '@mui/material';
import {getUserTask} from '../../../../api/mentor/review/api';
import {useParams} from 'react-router-dom';
import {Markup} from 'interweave';

export default function DocumentTaskReview(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [document, setDocument] = useState<string>('');

  const {selectedTask} = props;
  const fresherId = useParams<{ fresherId: string }>().fresherId;

  const fetchTask = async () => {
    setLoading(true);
    const data = await getUserTask(fresherId, selectedTask.checklistId, selectedTask.id);
    console.log(data.task.document.document);
    setDocument(data.task.document.document);
    setLoading(false);
  };

  useEffect(() => {
    fetchTask();

    return () => {
      setLoading(false);
    };
  }, [selectedTask.id]);

  return (
    <div className="document-task-review">
      {loading ? (
        <CircularProgress/>
      ) : (
        <div className="document-task-review__container">
          <Markup content={document}/>
        </div>
      )}
    </div>
  );
}
