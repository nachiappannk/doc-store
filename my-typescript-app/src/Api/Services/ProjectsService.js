import CryptoJS from "crypto-js";
import { getAPI, postAPI, postFormAPI, deleteAPI } from "../Config/ApiMethods";
import {
  GetUserProjectsEndpoint,
  GetGroupAssociatedProjectsEndpoint,
  GetCreateNewFileInRepositoryEndpoint,
  GetProjectFilesListEndpoint,
  GetUploadFileToProjectEndpoint,
} from "../Config/ApiContants";

import { GetCurrentUser } from "./UserService";

function sha256(message) {
  var hash = CryptoJS.SHA256(message);
  return hash.toString(CryptoJS.enc.Hex);
}

function encodedFilename(fileName, encryptionKey) {
  let encodedFileName = btoa(fileName).replace("/", "-").replace("+", "_").replace("=", "!") + "." + sha256(encryptionKey);
  return encodedFileName;
}

function isValidBase64(str) {
  try {
    const decodedString = atob(str);    
    const reEncodedString = btoa(decodedString);
    return reEncodedString === str;
  } catch (error) {
    return false;
  }
}

export const getProjects = async () => {
  return await GetCurrentUser().then((userId) =>
    getAPI(GetUserProjectsEndpoint(userId))
  );
};

export const getGroupProjects = async (groupId) => {
  return await getAPI(GetGroupAssociatedProjectsEndpoint(groupId));
};

export const createNewFileInRepository = async (projectId, fileName, data, encryptionKey) => {
  var encodedFileName = encodedFilename(fileName, encryptionKey);
  console.log(encodedFileName);
  return await postAPI(
    GetCreateNewFileInRepositoryEndpoint(projectId, encodedFileName),
    data
  );
};

export const uploadFiletoProject = async (projectId, data) => {
  const formData = new FormData();
  formData.append("file=", data);
  return await postFormAPI(GetUploadFileToProjectEndpoint(projectId), data);
};

export const getProjectFilesList = async (projectId, encryptionKey) => {
  let files = await getAPI(GetProjectFilesListEndpoint(projectId));
  
  files.data.forEach(function(element) {
    let name = element.name;
    let parts = element.name.split(".");
    if(parts.length != 2){
      element.isValid = false;
    } else if (!isValidBase64(parts[0])){

    } else {
      
      let decodedName = element.name.replace("-", "/").replace("_", "+").replace("!", "=").atob();
    }
  });
  console.log(files);
  return files;
};

export const downloadProjectFile = async (projectId, fileName) =>{

  let result = await getAPI(GetCreateNewFileInRepositoryEndpoint(projectId, fileName)+"?ref=main");
  let base64_string = result.data.content;
  let byteArray = Uint8Array.from(atob(base64_string), c => c.charCodeAt(0))
  const blob = new Blob([byteArray], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
};


export const deleteProjectFile = async (projectId, fileName) => {
  return await deleteAPI(
    GetCreateNewFileInRepositoryEndpoint(projectId, fileName),
    { branch: "main", commit_message: "deleteing", file_path: fileName }
  );
};
