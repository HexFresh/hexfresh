import React from 'react';
import './task-review.css';

export default function TaskReview(props: any) {
  const { selectedTask } = props;
  console.log(selectedTask);
  return (
    <div className="task-review">
      <div className="task-review__container">
        <div className="task-review__header">{selectedTask.title}</div>
      </div>
    </div>
  );
}
