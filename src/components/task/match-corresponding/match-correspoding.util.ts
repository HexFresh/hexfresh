import _ from "lodash";
import { IChoiceCorrespondingQuestion } from "../../../interface/program-interface";

export const isTrueAnswer = ({answers}:{answers: IChoiceCorrespondingQuestion[]})=>{
  if(_.isEmpty(answers)) return false;
  
  for (let index = 0; index < answers.length; index++) {
    const element = answers[index];
    if (element.firstCorrectAnswerId !== element.userFisrtAnswerId || element.secondCorrectAnswerId !== element.userSecondAnswerId) {
     return false;
    }
  }

  return true;
}