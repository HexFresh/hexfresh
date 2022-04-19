import React from 'react';
import MultipleTaskReview from './MultipleTaskReview/MultipleTaskReview';
import SingleTaskReview from './SingleTaskReview/SingleTaskReview';
import './task-review.css';

export default function TaskReview(props: any) {
  const { selectedTask } = props;
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
      default:
        return <div className="task-type">Chưa làm</div>;
    }
  };

  const renderTask = () => {
    switch (selectedTask.typeId) {
      case 1:
        return <SingleTaskReview selectedTask={selectedTask} />;
      case 2:
        return <MultipleTaskReview selectedTask={selectedTask} />;
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
          <div className="task-review__header__right"></div>
        </div>
        <div className="task-review__content">{renderTask()}</div>
      </div>
    </div>
  );
}