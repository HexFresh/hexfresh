import { useState } from 'react';

const useInput = (validateData:(data:string)=>boolean) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateData(value);
  const valueHasError = !valueIsValid && isTouched;

  const onChangeHandler = (event:{target:{value:any}}) => {
    setValue(event.target.value);
  };

  const onBlurHandler = () => {
    setIsTouched(true);
  };

  const resetValue = () => {
    setValue('');
    setIsTouched(false);
  };

  return {
    value,
    valueIsValid,
    valueHasError,
    onChangeHandler,
    onBlurHandler,
    resetValue,

  };
};

export default useInput;
