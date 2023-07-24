import React from 'react';
import { useState, createContext, useContext } from 'react';
import './index.css';
import { AuthContext } from "react-oauth2-code-pkce"
import './EncryptionContainer.css';
import sha256 from 'crypto-js/sha256';
import CryptoJs from 'crypto-js';

const EncryptionContext = createContext();

const EncryptionContainer = (props) => {
  const [encryptionPhrase, setEncryptionPhrase] = useState("Nachiappan");
  const { token } = useContext(AuthContext);
  const [groupName, setGroupName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [passPhrase, setPassPhrase] = useState('');
  const [isVerificationCodeShown, setIsVerificationCodeShown] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userVerificationCode, setUserVerificationCode] = useState('');
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const handleCheckboxChange = () => {
    setIsVerificationCodeShown(!isVerificationCodeShown);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleUserVerificationCode = (event) => {
    setUserVerificationCode(event.target.value);
  };

  const handlePassPhraseChange = (event) => {
    setPassPhrase(event.target.value);
    let passPhraseLocal = event.target.value ?? "";
    console.log(passPhraseLocal);
    let sha256Code = sha256(passPhraseLocal);
    let hexCode = sha256Code.toString(CryptoJs.enc.Hex).substring(0, 4);
    var intcode = parseInt(hexCode, 16);
    var verificationCode = intcode % 1000;
    setVerificationCode(verificationCode.toString());
    computeIsSubmitEnabled();
  };

  const computeIsSubmitEnabled = () =>{
    if(verificationCode == userVerificationCode)
    {
      console.log("enabled"+verificationCode+userVerificationCode);
      setIsSubmitEnabled(true);      
    }else
    {
      console.log("disbled"+verificationCode+userVerificationCode);
      setIsSubmitEnabled(false);
    }
  }

  return <>
    {token ? (
      <>
        <div className="centered-container">
          <EncryptionContext.Provider value={encryptionPhrase}>
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
              <div className="input-group">
                <label htmlFor="show-verification-code-input">Setting Up - Show verification code
                  <input
                    type="checkbox"
                    id="show-verification-code-input"
                    value={isVerificationCodeShown}
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div>
              <br />
              {isVerificationCodeShown ? (
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
              ):(
              <>
                <div className="input-group">
                  <label htmlFor="user-verification-code">Verification Code</label>
                  <input
                    type="text"
                    id="verification-code"
                    value={userVerificationCode}
                    onChange={handleUserVerificationCode}
                  />
                </div>
                <br />
              </>
              )}
            </div>
            <button className="login-button" disabled={!isSubmitEnabled} onClick={() => {console.log("clicked")}}>Set Encryption Key</button>
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

