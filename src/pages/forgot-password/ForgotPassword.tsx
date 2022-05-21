import React, {useState} from "react";
import {Button, Input} from 'antd'
import './forgot-password.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

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
          <Input className="field__input" placeholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="field">
          <div className="field__label">Verify</div>
          <div className="field__verify">
            <Input onChange={(e) => setVerifyCode(e.target.value)} className="field__verify__input"
                   placeholder={"Verify code"}/>
            <Button disabled={email === ''} type={"primary"} className="field__verify__get-btn">Get
              verification</Button>
          </div>

        </div>
        <div className="field">
          <div className="field__label">New password</div>
          <Input onChange={(e) => setNewPassword(e.target.value)} disabled={verifyCode === ''} className="field__input"
                 placeholder={"New password"}/>
        </div>
        <div className="field">
          <div className="field__label">Confirm password</div>
          <Input onChange={(e) => setConfirmPassword(e.target.value)} disabled={verifyCode === ''}
                 className="field__input" placeholder={"Confirm password"}/>
        </div>
        <div className="field">
          <Button style={{
            width: '100%',
          }} type={"primary"} className="confirm-btn" disabled={newPassword === '' || confirmPassword === ''}>Confirm
            the changes</Button>
        </div>
      </div>
    </div>
  )
};