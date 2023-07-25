# Confidential Documents Store (Credentials store)

## Overview
 - This project is a document store. The document is to be stored in git service such as GitHub, BitBucket, GitLab in an encrypted form.
 - The project is envisioned as a Front-end application.
 - The application should have a log in screen. The login screen should be backed by the Git Service provider.
 - Post logging in to the application, the encryption phrase is set.
 - This phrase is used to encrypt/decrypt the text documents.
 - As the authentication is already completed, the encrypted documents are stored in Git repository.
 - It is important to note each encryption/decryption happens on the browser. Unencrypted document does not leave the browser.
 
## Use cases
 - Create a document.
 - View the list of document names available.
 - View the content of one document.
 - Update the content of one document.
 - Delete a document.
 - Search a document from the list based on the name.

## Supporting Use cases
To meet the main use cases, the following supporting use cases are necessary.
 - Login to Git Service provider
 - Setting the encryption phrase

## Design Decisions made
| Topic | Decision |
| --------:| --------: |
|Project Framework | ReactJS, Create React App |
|Code Repo | GitHub : https://github.com/nachiappannk/doc-store |
|Deployment | Azure (Static WebApp): [React App](https://wonderful-desert-0c742fe00.3.azurestaticapps.net/) |
|CICD pipelines | GitHub Actions |
|Git Repo for storing documents| GitLab |
|Authentication Provider| GitLab (GitLab though is not as popular as GitHub does provide PCKE authentication – not provided by Github) |
