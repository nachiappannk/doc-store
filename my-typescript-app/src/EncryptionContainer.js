import React from 'react';
import { useState, createContext, useContext } from 'react';
import './index.css';
import { AuthContext } from "react-oauth2-code-pkce"

const EncryptionContext = createContext();

const EncryptionContainer = (props) => {
    const [encryptionPhrase, setEncryptionPhrase] = useState("Nachiappan");
    const {token} = useContext(AuthContext);
    return <>
      {token ? (
        <>
            <EncryptionContext.Provider value ={encryptionPhrase}>
                <div>start of encryption container</div>
                <div>
                        {props.children}
                </div>
                <div>end of encryption container</div>
            </EncryptionContext.Provider>
        </>
      ) : (
        <>
          <div>Error</div>
        </>
      )}
    </>
  }

  export { EncryptionContext }
  export default EncryptionContainer;

