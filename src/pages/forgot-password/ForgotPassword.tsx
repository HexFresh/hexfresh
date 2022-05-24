import React, {useState} from "react";
import {Button, Input, Typography} from 'antd'
import './forgot-password.css';
import ReCAPTCHA from "react-google-recaptcha";

const siteKey = "6LeWfRYgAAAAAOWfVJB9f0PjyujtfmyQt6K1NOXY";
const {Text} = Typography;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [captcha, setCaptcha] = useState('');

  function onReCAPTCHAChange(value: any) {
    setCaptcha(value);
  }

  function onReCAPTCHAExpired() {
    setCaptcha('');
  }

  return (
    <div className="forgot-password">
      <div className="forgot-password__container">
        <div className="forgot-password__container__title">
          <img style={{
            width: '60px',
            height: '60px',
          }} src="/logo.svg" width="100px" alt="logo"/>
          <h2>Forgot Password</h2>
        </div>

        <div className="field">
          <div className="field__label">Email</div>
          <div className="field__input"><Input onChange={(e) => setEmail(e.target.value)}
                                               placeholder={"Email"}/>
            <Text
              className={!email.includes('@') && email !== "" ? "validate-message-active" : "validate-message"}
              type="danger">Email must contain "@"</Text></div>
        </div>

        <div className="field">
          <div className="field__label">New password</div>
          <Input type={"password"} onChange={(e) => setNewPassword(e.target.value)} disabled={verifyCode === ''}
                 className="field__input"
                 placeholder={"New password"}/>
        </div>
        <div className="field">
          <div className="field__label">Confirm password</div>
          <div className="field__input"><Input type={"password"} onChange={(e) => setConfirmPassword(e.target.value)}
                                               disabled={verifyCode === '' || newPassword === ''}
                                               placeholder={"Confirm password"}/>
            <Text
              className={newPassword !== confirmPassword && confirmPassword !== "" ? "validate-message-active" : "validate-message"}
              type="danger">The password confirmation does not match</Text></div>
        </div>
        <div className="field">
          <div className="field__label">Verify</div>
          <div className="field__verify">
            <Input type={"danger"} disabled={email === ''} onChange={(e) => setVerifyCode(e.target.value)}
                   className="field__verify__input"
                   placeholder={"Verify code"}/>
            <Button disabled={email === ''} type={"primary"} className="field__verify__get-btn">Get
              verification</Button>
          </div>
        </div>

        <ReCAPTCHA
          sitekey={siteKey}
          onChange={onReCAPTCHAChange}
          onExpired={onReCAPTCHAExpired}
        />
        <div className="field">
          <Button style={{
            width: '100%',
          }} type={"primary"} className="confirm-btn"
                  disabled={newPassword === '' || confirmPassword === '' || captcha === '' || !email.includes('@') || newPassword !== confirmPassword}>Confirm
            the changes</Button>
        </div>
      </div>
    </div>
  )
};
