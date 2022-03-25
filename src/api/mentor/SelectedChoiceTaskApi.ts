import axiosClient from '../axiosClient';

export const getChoicesWithAnswer = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz/selected-question/choice/answer`;
  try {
    const response = await axiosClient.get(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateChoice = async (
  taskId: number,
  choiceId: number,
  choice: any
) => {
  const endpoint = `task/${taskId}/quiz/selected-question/choice/${choiceId}`;
  try {
    const response = await axiosClient.put(endpoint, choice);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addEmptyChoice = async (taskId: number) => {
  const endpoint = `task/${taskId}/quiz/selected-question/choice`;
  try {
    const response = await axiosClient.post(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteChoice = async (taskId: number, choiceId: number) => {
  const endpoint = `task/${taskId}/quiz/selected-question/choice/${choiceId}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateBulkChoices = async (taskId: number, newChoices: any[]) => {
  const endpoint = `task/${taskId}/quiz/selected-question/bulk/choice`;
  const choices = newChoices.map((choice) => {
    return {
      ...choice,
      choiceId: choice.id,
    };
  });

  try {
    const response = await axiosClient.put(endpoint, { choices });
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error);
  }
};
