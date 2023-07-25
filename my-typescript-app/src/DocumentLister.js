import React from 'react';
import { useContext } from 'react';
import './index.css';
import { AuthContext } from "react-oauth2-code-pkce"
import { EncryptionContext } from './EncryptionContainer';


const DocumentLister = (props) => {
    const {token} = useContext(AuthContext);
    const phrase = useContext(EncryptionContext);
    console.log(phrase)
    return <>
      {token ? (
        <>
          <div>
                <h4>Main Document</h4>
                <span>The token: </span>{token}
                <div></div>
                <span>The encryption phrase: </span>{phrase}
          </div>
        </>
      ) : (
        <>
          <div>Error</div>
        </>
      )}
    </>
  }

  export default DocumentLister;