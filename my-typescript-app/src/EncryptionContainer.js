import React from 'react';
import { useContext } from 'react';
import './index.css';
import { AuthContext } from "react-oauth2-code-pkce"

const EncryptionContainer = (props) => {
    const {token} = useContext(AuthContext);
    return <>
      {token ? (
        <>
            <div>start of encryption container</div>
          <div>
                {props.children}
          </div>
          <div>end of encryption container</div>
        </>
      ) : (
        <>
          <div>Error</div>
        </>
      )}
    </>
  }

  export default EncryptionContainer;