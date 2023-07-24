import React from 'react';
import { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './LoginContainer.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContext, AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce"


const LoginContainer = (props) => {
    const {token, login, logOut} = useContext(AuthContext);
    const authContext = useContext(AuthContext);
  
    console.log(authContext);
    console.log(token);
    return <>
      {token ? (
        <>
          <div>
            <h4>Access Token (JWT) container</h4>
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
        <div className="login-container">
            <p className="login-message">Kindly use your GitLab account to log in</p>
            <p className="login-message">In case you do not possess an account, kindly proceed to create one on <a href="https://gitlab.com/" target="_blank"> Gitlab </a></p>
            <button className="login-button" onClick={() => login()}>Login with Gitlab</button>
        </div>
        </>
      )}
    </>
  }

  export default LoginContainer;