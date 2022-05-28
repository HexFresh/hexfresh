import axiosClient from "./axiosClient";

export const sendVerificationCodeByEmail = async (email: string) => {
  const endpoint = `auth/forgot-password/mail`;
  try {
    const response = await axiosClient.post(endpoint, {email});
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const verifyForgotPasswordRequest = async (email: string, newPassword: string, verificationCode: string) => {
  const endpoint = `auth/forgot-password`;
  try {
    const response = await axiosClient.post(endpoint, {email, newPassword, verificationCode});
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const verifyResetPasswordRequest = async (oldPassword: string, newPassword: string) => {
  const endpoint = `auth/reset-password`;
  try {
    const response = await axiosClient.post(endpoint, {oldPassword, newPassword});
    const {data} = response;
    return data;
  } catch (error) {
    console.log(error);
  }
}