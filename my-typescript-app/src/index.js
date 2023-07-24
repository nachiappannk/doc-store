import React from 'react';
import { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContext, AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce"



const authConfig = {
  clientId: '6eb6e1f06303fb4a94296cc3452564cb01801b4e964422509497519a7fea65e4',
  authorizationEndpoint: 'https://gitlab.com/oauth/authorize',
  tokenEndpoint: 'https://gitlab.com/oauth/token',
  redirectUri: 'http://localhost:3000/',
  scope: 'api read_api read_user create_runner read_repository write_repository read_registry write_registry read_observability write_observability sudo admin_mode openid profile email',
  onRefreshTokenExpire: (event) => window.confirm('Session expired. Refresh page to continue using the site?') && event.login(),
  autoLogin : false,
  decodeToken : false
}

const UserInfo = (props) => {
  const {token, login, logOut} = useContext(AuthContext);
  const authContext = useContext(AuthContext);

  console.log(authContext);
  console.log(token);
  return <>
    {token ? (
      <>
        <div>
          <h4>Access Token (JWT)</h4>
          <pre
            style={{
              width: '400px',
              margin: '10px',
              padding: '5px',
              border: 'black 2px solid',
              wordBreak: 'break-all',
              whiteSpace: 'break-spaces',
            }}
          >
            {token}
          </pre>
        </div>
        <button onClick={() => logOut()}>Logout</button>
        <>
            {props.children}
        </>
      </>
    ) : (
      <>
        <div>You are not logged in.</div>
        <button onClick={() => login()}>Login</button>
      </>
    )}
  </>
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider authConfig={authConfig}>
    
        <UserInfo><div>hi this is a message</div></UserInfo>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
