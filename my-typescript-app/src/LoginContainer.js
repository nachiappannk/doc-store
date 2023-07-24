import React from 'react';
import { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
          <div>You are not logged in.(Login container)</div>
          <button onClick={() => login()}>Login</button>
        </>
      )}
    </>
  }

  export default LoginContainer;