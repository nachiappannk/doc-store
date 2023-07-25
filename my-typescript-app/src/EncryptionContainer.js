import React from 'react';
import { useState, createContext, useContext } from 'react';
import './index.css';
import { AuthContext } from "react-oauth2-code-pkce"
import './EncryptionContainer.css';
import sha256 from 'crypto-js/sha256';
import CryptoJs from 'crypto-js';

const EncryptionContext = createContext({});

const EncryptionContainer = (props) => {
  const { token } = useContext(AuthContext);

  const [isContextSet, setIsContextSet] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [passPhrase, setPassPhrase] = useState('');
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const [verificationCode, setVerificationCode] = useState('');

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
    handleNext(event.target.value, projectName, passPhrase);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
    handleNext(groupName, event.target.value, passPhrase);
  };

  const handlePassPhraseChange = (event) => {
    let passPhraseLocal = event.target.value ?? "";
    setPassPhrase(passPhraseLocal);
    let sha256Code = sha256(passPhraseLocal);
    let hexCode = sha256Code.toString(CryptoJs.enc.Hex).substring(0, 4);
    let intcode = parseInt(hexCode, 16);
    let verificationCode = intcode % 1000;
    let verificationCodeString = verificationCode.toString(); 
    setVerificationCode(verificationCodeString);
    handleNext(groupName, projectName, passPhraseLocal);
  };

  const handleNext = (gName, pName, pp) => {
    let isValid = true;
    isValid = isValid && isStringValid(gName);
    isValid = isValid && isStringValid(pName);
    isValid = isValid && isStringValid(pp);
    setIsNextEnabled(isValid);
  }

  const isStringValid = (str) =>{
    return (!(!(str && str.trim())));
  }

  let test = {groupName: groupName, projectName: projectName}
  return <>
    {!isContextSet ? (
      <>
        <div className="centered-container">
          <EncryptionContext.Provider value={[groupName, projectName, passPhrase]}>
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
            <button className="login-button" disabled={!isNextEnabled} onClick={() => {console.log("clicked")}}>Set Encryption Key</button>
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

