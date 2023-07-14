import React, { useState } from 'react';
import './LoginForm.css';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      // Lưu email và mật khẩu vào local storage
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

      // Chuyển đến trang mới
      window.location.href = '/home';
    }
  };

  return (
    <div className="css-fix">
        <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="blogin" type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default LoginView;
