import React from 'react';
import { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContext, AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce"



const authConfig = {
  clientId: '6eb6e1f06303fb4a94296cc3452564cb01801b4e964422509497519a7fea65e4',
  authorizationEndpoint: 'https://gitlab.com/oauth/authorize?response_type=code&grant_type=authorization_code',
  tokenEndpoint: 'https://gitlab.com/oauth/token',
  redirectUri: 'http://localhost:3000/',
  scope: 'api',
  onRefreshTokenExpire: (event) => window.confirm('Session expired. Refresh page to continue using the site?') && event.login(),
}

const UserInfo = () => {
  const {token, tokenData} = useContext(AuthContext)

  console.log(token);
  console.log(tokenData);
  return <>
      <h4>Access Token</h4>
      <pre>{token}</pre>
      <h4>User Information from JWT</h4>
      <pre>{JSON.stringify(tokenData, null, 2)}</pre>
  </>
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider authConfig={authConfig}>
        <UserInfo/>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
