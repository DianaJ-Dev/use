import React, { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState('')  
  const [emailError, setEmailError] = useState('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')


  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(emailValue) ? '' : 'Por favor digite un email válido.');
  }

  const handlePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue)
    setPasswordError(passwordValue.length < 6 ? 'la clave debe ser mayor a 7': '')
  }


  return (
    <div>
        <form>
            <div>
                <input
                type='email'
                placeholder='ingrese su email'
                value={email}
                onChange={handleEmail}
                className={emailError ? 'error' : ''}
                ></input>
                {emailError && <small className="error-text">{emailError}</small>}
            </div>
            <div>
                <input
                type='password'
                placeholder='digite su contraseña'
                value={password}
                onChange={handlePassword}
                className={passwordError ? 'error' : ''}
                ></input>
                {passwordError && <small className="error-text">{passwordError}</small> }
            </div>
        </form>
    </div>
  )
}

export default Login
