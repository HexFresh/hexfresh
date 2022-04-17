import { Checkbox, Space } from "antd";
import _ from "lodash";
import { memo } from "react";

import { ITask } from "../../../interface/program-interface";

export const MultipleChoices = memo(({
    isEdit,
    isTaken,
    task,
    multipleChoices,
    _onChangeMultipleChoices
}: {
    isEdit: boolean,
    isTaken: boolean,
    task: ITask,
    multipleChoices: number[],
    _onChangeMultipleChoices: any
})=>{
    return <Checkbox.Group style={{ width: '100%' }}
    disabled={!isEdit && isTaken}
    onChange={_onChangeMultipleChoices}
    value={multipleChoices}
  >
    <Space direction="vertical">
      {_.map(
        task.selected_question_choices,
        choice => <Checkbox key={choice.id} value={choice.id}>{choice.content}</Checkbox>
      )}
    </Space>
  </Checkbox.Group>
});

MultipleChoices.displayName ='MultipleChoices';