import React from 'react';
import ConstructedTaskReview from './constructed-task-review/ConstructedTaskReview';
import MatchCorrespondingTaskReview from './match-corresponding-task-review/MatchCorrespondingTaskReview';
import MatchSequenceTaskReview from './match-sequence-task-review/MatchSequenceTaskReview';
import MultipleTaskReview from './multiple-task-review/MultipleTaskReview';
import SingleTaskReview from './single-task-review/SingleTaskReview';
import TrueFalseTaskReview from './true-false-task-review/TrueFalseTaskReview';
import AssignmentReview from './assignment-review/AssignmentReview';
import './task-review.css';
import DocumentTaskReview from "./document-task-review/DocumentTaskReview";

export default function TaskReview(props: any) {
  const {selectedTask} = props;
  console.log(selectedTask);
  const renderType = () => {
    switch (selectedTask.typeId) {
      case 1:
        return <div className="task-type">Single Choice</div>;
      case 2:
        return <div className="task-type">Multiple Choice</div>;
      case 3:
        return <div className="task-type">Constructed-Response</div>;
      case 4:
        return <div className="task-type">True-False</div>;
      case 5:
        return <div className="task-type">Match Sequence</div>;
      case 6:
        return <div className="task-type">Match Corresponding</div>;
      case 7:
        return <div className="task-type">Document</div>;
      case 8:
        return <div className="task-type">Assignment</div>;
      default:
        return <div className="task-type">Chưa làm</div>;
    }
  };

  const renderTask = () => {
    switch (selectedTask.typeId) {
      case 1:
        return <SingleTaskReview selectedTask={selectedTask}/>;
      case 2:
        return <MultipleTaskReview selectedTask={selectedTask}/>;
      case 3:
        return <ConstructedTaskReview selectedTask={selectedTask}/>;
      case 4:
        return <TrueFalseTaskReview selectedTask={selectedTask}/>;
      case 5:
        return <MatchSequenceTaskReview selectedTask={selectedTask}/>;
      case 6:
        return <MatchCorrespondingTaskReview selectedTask={selectedTask}/>;
      case 7:
        return <DocumentTaskReview selectedTask={selectedTask}/>;
      case 8:
        return <AssignmentReview selectedTask={selectedTask}/>;
      default:
        return <div className="task-type">Chưa làm</div>;
    }
  };
  return (
    <div className="task-review">
      <div className="task-review__container">
        <div className="task-review__header">
          <div className="type">{renderType()}</div>
          <div className="title">{selectedTask.title}</div>
          <div className="task-review__header__right">{selectedTask.point || '0'}</div>
        </div>
        <div className="task-review__content">{renderTask()}</div>
      </div>
    </div>
  );
}
