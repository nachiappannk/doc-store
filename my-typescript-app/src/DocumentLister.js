import React from 'react';
import { useContext } from 'react';
import './index.css';
import { AuthContext } from "react-oauth2-code-pkce"
import { EncryptionContext } from './EncryptionContainer';


const DocumentLister = (props) => {
    const {token} = useContext(AuthContext);
    const [groupName, projectName, encryptionKey, clear] = useContext(EncryptionContext);
    
    return <>
      {token ? (
        <>
          <div><span>The token: </span>{token}</div>
          <div><span>The Group: </span>{groupName}</div>
          <div><span>The project: </span>{projectName}</div>
          <div><span>The EncryptionKey: </span>{encryptionKey}</div>
          <button onClick={()=> clear()}>clear encryption key</button>
        </>
      ) : (
        <>
          <div>Error</div>
        </>
      )}
    </>
  }

  export default DocumentLister;