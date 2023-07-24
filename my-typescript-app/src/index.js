import React from 'react';
import { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContext, AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce"
import LoginContainer from './LoginContainer';
import DocumentLister from './DocumentLister';
import EncryptionContainer from './EncryptionContainer';

const authConfig = {
  clientId: '6eb6e1f06303fb4a94296cc3452564cb01801b4e964422509497519a7fea65e4',
  authorizationEndpoint: 'https://gitlab.com/oauth/authorize',
  tokenEndpoint: 'https://gitlab.com/oauth/token',
  redirectUri: 'https://wonderful-desert-0c742fe00.3.azurestaticapps.net/',
  scope: 'api read_api read_user create_runner read_repository write_repository read_registry write_registry read_observability write_observability sudo admin_mode openid profile email',
  onRefreshTokenExpire: (event) => window.confirm('Session expired. Refresh page to continue using the site?') && event.login(),
  autoLogin : false,
  decodeToken : false
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider authConfig={authConfig}>
        <LoginContainer>
          <EncryptionContainer>
            <DocumentLister/>
          </EncryptionContainer>
        </LoginContainer>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
