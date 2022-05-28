import { memo } from "react";
import _ from "lodash";
import { List, Radio, Space } from "antd";
import Text from 'antd/lib/typography/Text';

import { IAnswerBinaryQuestion, ITask } from "../../../interface/program-interface";

export const BinaryQuiz = memo(({
    isEdit,
    isTaken,
    task,
    answerBinaryQuestion,
    binaryChoices,
    onChangeBinaryChoices
}: {
    isEdit: boolean,
    isTaken: boolean,
    task: ITask,
    answerBinaryQuestion: IAnswerBinaryQuestion,
    binaryChoices: any[],
    onChangeBinaryChoices: any
})=>{
    return <>
    <Space direction='horizontal'>
      <Text strong>True</Text>
      <Text strong>False</Text>
    </Space>
    <List
      dataSource={task.true_false_question_options}
      renderItem={(item) => {
        const answer = _.find(answerBinaryQuestion?.answers, ['optionId', item.id]);
        const currentValue = (isEdit || !isEdit && !isTaken) ? (_.find(binaryChoices, ['id', item.id])) : (
          { id: answer?.optionId, userAnswer: answer?.userAnswer }
        );
        return <List.Item >
          <Space direction="horizontal">
            <Radio.Group style={{ width: '100%' }} onChange={onChangeBinaryChoices} value={JSON.stringify(currentValue)}>
              <Space direction="horizontal">
                <Radio className='ml-small' key={JSON.stringify({ id: item.id, userAnswer: true })} value={JSON.stringify({ id: item.id, userAnswer: true })}></Radio>
                <Radio className='ml-small' key={JSON.stringify({ id: item.id, userAnswer: false })} value={JSON.stringify({ id: item.id, userAnswer: false })}></Radio>
              </Space>
            </Radio.Group>
            {item.content}
          </Space>
        </List.Item>
      }}
    />
  </>;
})