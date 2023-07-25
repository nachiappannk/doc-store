import React from 'react';
import { useState, createContext, useContext } from 'react';
import './index.css';
import { AuthContext } from "react-oauth2-code-pkce"
import './EncryptionContainer.css';
import sha256 from 'crypto-js/sha256';
import CryptoJs from 'crypto-js';

const EncryptionContext = createContext();

const EncryptionContainer = (props) => {
  const { token } = useContext(AuthContext);

  const [groupName, setGroupName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [passPhrase, setPassPhrase] = useState('');

  const [verificationCode, setVerificationCode] = useState('');

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handlePassPhraseChange = (event) => {

    let passPhraseLocal = event.target.value ?? "";
    
    console.log("The passphrase is " + passPhraseLocal);
    setPassPhrase(passPhraseLocal);
    
    let sha256Code = sha256(passPhraseLocal);
    let hexCode = sha256Code.toString(CryptoJs.enc.Hex).substring(0, 4);
    let intcode = parseInt(hexCode, 16);
    let verificationCode = intcode % 1000;
    let verificationCodeString = verificationCode.toString(); 
    console.log("The verification is " + verificationCodeString);
    setVerificationCode(verificationCodeString);
  };

  return <>
    {token ? (
      <>
        <div className="centered-container">
          <EncryptionContext.Provider value={passPhrase}>
            <div>
              <div className="input-group">
                <label htmlFor="group-name-input">Group Name:</label>
                <input
                  type="text"
                  id="group-name-input"
                  value={groupName}
                  onChange={handleGroupNameChange}
                />
              </div>
              <br />
              <div className="input-group">
                <label htmlFor="project-name-input">Project Name</label>
                <input
                  type="text"
                  id="project-name-input"
                  value={projectName}
                  onChange={handleProjectNameChange}
                />
              </div>
              <br />
              <div className="input-group">
                <label htmlFor="passphrase">Encryption Pass Phrase</label>
                <input
                  type="password"
                  id="passphrase"
                  value={passPhrase}
                  onChange={handlePassPhraseChange}
                />
              </div>
              <br />
              <>
                <div className="input-group">
                  <label htmlFor="verification-code">Verification Code</label>
                  <input
                    type="text"
                    id="verification-code"
                    readOnly={true}
                    value={verificationCode}
                  />
                </div>
                <br />
              </>
            </div>
            <button className="login-button" disabled={true} onClick={() => {console.log("clicked")}}>Set Encryption Key</button>
            <div>
              {props.children}
            </div>
          </EncryptionContext.Provider>
        </div>
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

