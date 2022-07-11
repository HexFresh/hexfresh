import { Button, Typography } from "antd";
import { isEmpty } from "lodash";
import { memo } from "react";
import { IProgram } from "../../../interface/program-interface";

import './select-program.style.scss'
export const SelectProgramItem = memo(({
  program,
  enableSwitch= false,
  onToggleSelectProgramModal,
  txtColor='white',
}:{
  program: IProgram,
  enableSwitch?: boolean,
  onToggleSelectProgramModal?: any,
  txtColor?: string,
}) => {
  if(isEmpty(program)){
    return null;
  }
  const {image, title} = program;
  return <div className="planet-progress">
    <div className="img">
      <img src={image?.imageLink} alt="your planet" />
    </div>
    <Typography.Text className={`txt-color-${txtColor}`}>{title}</Typography.Text>
    {enableSwitch&&<button onClick={onToggleSelectProgramModal} className={`bg-glassmorphism border-card txt-color-${txtColor} switch-button`}> Switch Program</button>}
  </div>
});

SelectProgramItem.displayName = 'SelectProgramItem'

