import React from 'react';
import { useContext } from 'react';
import './LoginContainer.css';
import { AuthContext } from "react-oauth2-code-pkce"


const LoginContainer = (props) => {
    const {token, login, logOut} = useContext(AuthContext);
    const authContext = useContext(AuthContext);
    const name = authContext?.idTokenData?.name ?? "user";
    return <>
      {token ? (
        <>
          <div className="login-container">
          <p className="login-message">Welcome {name}</p>
          <button className="login-button" onClick={() => logOut()}>Logout</button>
          <>{props.children}</>    
          </div>
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