import { Radio, Space } from "antd";
import _ from "lodash";
import { memo } from "react";

import { ITask } from "../../../interface/program-interface";

export const SingleChoice = memo((
    {
        isEdit,
        isTaken,
        task,
        radioValue,
        _onChangeSingleChoice
    }: {
        isEdit: boolean,
        isTaken: boolean,
        task: ITask,
        radioValue: number,
        _onChangeSingleChoice: any
    }) => {
    return <Radio.Group style={{ width: '100%' }}
        disabled={!isEdit && isTaken}
        onChange={_onChangeSingleChoice}
        value={radioValue}>
        <Space direction="vertical">
            {task.selected_question_choices && _.map(
                task.selected_question_choices,
                choice => <Radio key={choice.id} value={choice.id}>{choice.content}</Radio>
            )}
        </Space>
    </Radio.Group>
});

SingleChoice.displayName='SingleChoice';